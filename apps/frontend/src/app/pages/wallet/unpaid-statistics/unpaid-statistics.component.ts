import { UnpaidTrStatisticsDto } from '@ap3/api';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { TradeReceivableService } from '../../../shared/services/trade-receivable/trade-receivable.service';

@Component({
  selector: 'app-unpaid-statistics',
  templateUrl: './unpaid-statistics.component.html',
  styleUrl: './unpaid-statistics.component.scss',
})
export class UnpaidStatisticsComponent {
  statisticsDto$: Observable<UnpaidTrStatisticsDto>;
  constructor(private readonly tradeReceivablesService: TradeReceivableService) {
    this.statisticsDto$ = tradeReceivablesService.getUnPaidTradeReceivablesStatistics();
  }
}
