import { InvoiceDto } from '@ap3/api';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable, Subscription } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Invoice } from '../../model/invoice';
import { InvoiceService } from '../../shared/services/invoices/invoices.service';
import { DateFormatService } from '../../shared/services/util/date-format.service';
import { DownloadInvoiceDialogComponent } from './download-invoice-dialog/download-invoice-dialog.component';

@Component({
  selector: 'app-receivables',
  templateUrl: './receivables.component.html',
  styleUrl: './receivables.component.scss',
})
export class ReceivablesComponent {
  displayedNFTColumns: string[] = [
    'select',
    'invoiceNumber',
    'creditor',
    'totalAmountWithoutVat',
    'currency',
    'invoiceDueDate',
    'debtor',
    'paymentStatus',
  ];
  dataSource: MatTableDataSource<Invoice>;
  dataSourceObservable: Observable<MatTableDataSource<Invoice>>;
  selection = new SelectionModel<Invoice>(true, []);
  translationStream: Subscription;
  paginator?: MatPaginator;
  sort?: MatSort;

  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly dateFormatService: DateFormatService,
    private readonly dialog: MatDialog,
    private readonly translateService: TranslateService
  ) {
    this.dataSource = new MatTableDataSource<Invoice>();
    this.dataSourceObservable = this.invoiceService.getInvoices().pipe(
      map((invoices: InvoiceDto[]) => {
        return this.buildDatasourceInvoices(invoices);
      })
    );
    this.translationStream = translateService.onLangChange.subscribe(() => {
      this.invoiceService.getInvoices().subscribe((invoices: InvoiceDto[]) => {
        this.buildDatasourceInvoices(invoices);
      });
    });
  }

  private buildDatasourceInvoices(invoices: InvoiceDto[]) {
    this.dataSource.data = Invoice.convertToInvoice(invoices, this.dateFormatService, this.translateService);
    return this.dataSource;
  }

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator ?? null;
    this.dataSource.sort = this.sort ?? null;
  }

  convertInputAndResetPaginator(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleSelectionForAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.dataSource.data);
    }
  }

  openDownloadInvoiceDialog() {
    this.dialog.open(DownloadInvoiceDialogComponent, {
      data: this.selection.selected,
      panelClass: 'mat-dialog-container',
      disableClose: true,
    });
  }
}
