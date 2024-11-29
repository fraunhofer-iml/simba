import { InvoiceDto } from '@ap3/api';
import { map, Observable } from 'rxjs';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../shared/services/auth/auth.service';
import { TradeReceivableService } from '../../shared/services/trade-receivable/trade-receivable.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.scss',
})
export class WalletComponent implements AfterViewInit {
  displayedNFTColumns: string[] = ['invoiceNo', 'payee', 'invoiceAmount', 'invoiceDueDate', 'payer', 'financialStatus'];
  nftDatasource: MatTableDataSource<InvoiceDto>;
  nftDatasourceObservable: Observable<MatTableDataSource<InvoiceDto>>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private readonly tradeReceivableService: TradeReceivableService,
    private readonly authService: AuthService
  ) {
    this.nftDatasource = new MatTableDataSource<InvoiceDto>();
    this.nftDatasourceObservable = tradeReceivableService.getTradeReceivables().pipe(
      map((tradeReceivables) => {
        const dataSource = this.nftDatasource;
        dataSource.data = tradeReceivables;
        return dataSource;
      })
    );
  }

  ngAfterViewInit() {
    this.nftDatasource.paginator = this.paginator;
    this.nftDatasource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.nftDatasource.filter = filterValue.trim().toLowerCase();

    if (this.nftDatasource.paginator) {
      this.nftDatasource.paginator.firstPage();
    }
  }
}
