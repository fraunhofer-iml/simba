import { InvoiceIdAndPaymentStateDto } from '@ap3/api';
import { PaymentStates } from '@ap3/util';
import { TranslateService } from '@ngx-translate/core';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Invoice } from '../../../model/invoice';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { FormatService } from '../../../shared/services/util/format.service';
import { DownloadInvoiceDialogComponent } from '../download-invoice-dialog/download-invoice-dialog.component';

@Component({
  selector: 'app-invoice-table',
  templateUrl: './invoice-table.component.html',
  styleUrl: './invoice-table.component.scss',
})
export class InvoiceTableComponent implements AfterViewInit {
  displayedInvoiceColumns: string[];
  paymentStates = [PaymentStates.PAID, PaymentStates.FINANCED];
  @Input() paymentStatusChanges!: InvoiceIdAndPaymentStateDto[];
  @Input() dataSource!: MatTableDataSource<Invoice>;
  @Input() selection: SelectionModel<Invoice> = new SelectionModel<Invoice>(true, []);
  @Input() set filterValue(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public readonly authService: AuthService,
    public readonly formatService: FormatService,
    private readonly translationService: TranslateService,
    private readonly dialog: MatDialog
  ) {
    this.displayedInvoiceColumns = [
      'select',
      'invoiceNumber',
      'creditor',
      'totalAmountWithoutVat',
      'currency',
      'invoiceDueDate',
      'debtor',
      'orderNumber',
      'paymentStatus',
    ];
  }

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.setFilterPredicate();
    }
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.filteredData.length;
    return numSelected === numRows && numRows > 0;
  }

  toggleSelectionForAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.dataSource.filteredData);
    }
  }

  changePaymentStatus(paymentStatus: string, row: Invoice) {
    const existingIndex = this.paymentStatusChanges.findIndex((change) => change.invoiceId === row.id);
    if (existingIndex !== -1) {
      this.paymentStatusChanges[existingIndex].paymentStatus = paymentStatus;
    } else {
      this.paymentStatusChanges.push(<InvoiceIdAndPaymentStateDto>{
        invoiceId: row.id,
        paymentStatus: paymentStatus,
      });
    }
    row.displayedStatus = paymentStatus;
  }

  isChanged(invoiceId: string): boolean {
    return this.paymentStatusChanges
      .map((change: InvoiceIdAndPaymentStateDto) => {
        return change.invoiceId;
      })
      .includes(invoiceId);
  }

  openDownloadInvoiceDialog(invoice: Invoice) {
    this.dialog.open(DownloadInvoiceDialogComponent, {
      data: [invoice],
      panelClass: 'mat-dialog-container',
      disableClose: true,
    });
  }

  private setFilterPredicate() {
    this.dataSource.filterPredicate = (data: Invoice, value: string): boolean => {
      return (
        (data.invoiceNumber ?? '').toLowerCase().includes(value) ||
        (data.creditor ?? '').toLowerCase().includes(value) ||
        (this.formatService.transformNumberToCurrentLanguageFormat(Number(data.totalAmountWithoutVat)) ?? '').includes(value) ||
        (data.currency ?? '').toLowerCase().includes(value) ||
        (this.formatService.transformDateToCurrentLanguageFormat(data.invoiceDueDate) ?? '').includes(value) ||
        (data.debtor ?? '').toLowerCase().includes(value) ||
        (this.translationService.instant(`PaymentStatus.${data.paymentStatus}`) ?? '').includes(value) ||
        (data.orderNumber ?? '').toLowerCase().includes(value)
      );
    };
  }
}
