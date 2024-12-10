import { InvoiceDto } from '@ap3/api';
import { map, Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DateFormatService } from '../../shared/formats/date-format.service';
import { InvoiceService } from '../../shared/services/invoices/invoices.service';
import { DownloadInvoiceDialogComponent } from './download-invoice-dialog/download-invoice-dialog.component';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.scss',
})
export class WalletComponent {
  displayedNFTColumns: string[] = [
    'select',
    'invoiceNumber',
    'creditor',
    'totalAmountWithoutVat',
    'invoiceDueDate',
    'debtor',
    'paymentStatus',
  ];
  dataSource: MatTableDataSource<InvoiceDto>;
  dataSourceObservable: Observable<MatTableDataSource<InvoiceDto>>;
  selection = new SelectionModel<InvoiceDto>(true, []);
  paginator?: MatPaginator;
  sort?: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly dateFormatService: DateFormatService,
    private readonly dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<InvoiceDto>();
    this.dataSourceObservable = invoiceService.getInvoices().pipe(
      map((invoices) => {
        const dataSource = this.dataSource;
        dataSource.data = invoices;
        return dataSource;
      })
    );
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

  getDateFormatOfCurrentLanguage(offer: InvoiceDto): string {
    return this.dateFormatService.transformDateToCurrentLanguageFormat(offer.invoiceDueDate);
  }

  openDownloadInvoiceDialog() {
    this.dialog.open(DownloadInvoiceDialogComponent, {
      data: this.selection.selected.map((invoice: InvoiceDto) => invoice.id),
    });
  }
}
