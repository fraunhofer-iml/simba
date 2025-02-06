import { InvoiceDto, InvoiceIdAndPaymentStateDto } from '@ap3/api';
import { PaymentStates } from '@ap3/util';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Invoice } from '../../model/invoice';
import { AuthService } from '../../shared/services/auth/auth.service';
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
  private readonly _snackBar = inject(MatSnackBar);
  paymentStates = [PaymentStates.PAID, PaymentStates.FINANCED];
  paymentStatusChanges: InvoiceIdAndPaymentStateDto[];
  dataSource!: MatTableDataSource<Invoice>;
  dataSourceObservable!: Observable<MatTableDataSource<Invoice>>;
  selection = new SelectionModel<Invoice>(true, []);
  paginator?: MatPaginator;
  sort?: MatSort;

  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly dateFormatService: DateFormatService,
    private readonly dialog: MatDialog,
    private readonly translationService: TranslateService,
    readonly authService: AuthService
  ) {
    this.paymentStatusChanges = [];
    this.dataSource = new MatTableDataSource<Invoice>();
    this.loadInvoices();
    this.setFilterPredicate();
  }

  private setFilterPredicate(): void {
    this.dataSource.filterPredicate = (data: Invoice, value: string): boolean => {
      return (
        data.invoiceNumber.includes(value) ||
        data.creditor.toLowerCase().includes(value) ||
        data.totalAmountWithoutVat.includes(value) ||
        data.currency.toLowerCase().includes(value) ||
        this.dateFormatService.transformDateToCurrentLanguageFormat(data.invoiceDueDate).includes(value) ||
        data.debtor.toLowerCase().includes(value) ||
        this.translationService.instant(`PaymentStatus.${data.paymentStatus}`).includes(value)
      );
    };
  }

  private loadInvoices() {
    this.dataSourceObservable = this.invoiceService.getInvoices().pipe(
      map((invoices: InvoiceDto[]) => {
        this.dataSource.data = Invoice.convertToInvoice(invoices);
        return this.dataSource;
      })
    );
  }

  getDateFormat() {
    return this.dateFormatService.getDateFormatByCurrentLang();
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

  changePaymentStatus(paymentStatus: string, row: Invoice) {
    this.paymentStatusChanges = this.paymentStatusChanges.filter((change: InvoiceIdAndPaymentStateDto) => change.invoiceId !== row.id);

    if (row.paymentStatus !== paymentStatus) {
      this.paymentStatusChanges.push(<InvoiceIdAndPaymentStateDto>{
        invoiceId: row.id,
        paymentStatus: paymentStatus,
      });
    }
    row.displayedStatus = paymentStatus;
  }

  sendChangeRequest() {
    this.invoiceService.createNewPaymentStatus(this.paymentStatusChanges).subscribe({
      complete: () => {
        this.loadInvoices();
        this.paymentStatusChanges = [];
        this.openSnackBar(true);
      },
      error: () => {
        this.loadInvoices();
        this.paymentStatusChanges = [];
        this.openSnackBar(false);
      },
    });
  }

  isChanged(invoiceId: string): boolean {
    return this.paymentStatusChanges
      .map((change) => {
        return change.invoiceId;
      })
      .includes(invoiceId);
  }

  openSnackBar(success: boolean): void {
    const message: string = success
      ? this.translationService.instant('PaymentStateChangeSuccessfulSnackBarMessage')
      : this.translationService.instant('PaymentStateErrorSnackBarMessage');

    const label: string = this.translationService.instant('CloseSnackBarAction');
    this._snackBar.open(message, label);
  }
}
