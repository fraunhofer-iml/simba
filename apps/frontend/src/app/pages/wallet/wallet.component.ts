import { TradeReceivableDto } from '@ap3/api';
import { map, Observable } from 'rxjs';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TradeReceivableService } from '../../shared/services/trade-receivable/trade-receivable.service';

export interface NFTDTO {
  invoiceNo: string;
  payee: string;
  invoiceAmount: number;
  invoiceDueDate: Date;
  payer: string;
  financialStatus: string;
}

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.scss',
})
export class WalletComponent {
  displayedNFTColumns: string[] = ['invoiceNo', 'payee', 'invoiceAmount', 'invoiceDueDate', 'payer', 'financialStatus'];
  nftDatasource: MatTableDataSource<TradeReceivableDto>;
  nftDatasourceObservable: Observable<MatTableDataSource<TradeReceivableDto>>;
  userId: string = 'pt0001';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(tradeReceivableService: TradeReceivableService) {
    this.nftDatasource = new MatTableDataSource<TradeReceivableDto>();
    this.nftDatasourceObservable = tradeReceivableService.getTradeReceivableByUserId(this.userId).pipe(
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
