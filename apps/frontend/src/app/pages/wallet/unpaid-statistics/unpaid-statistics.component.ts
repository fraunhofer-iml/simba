import { UnpaidTrStatisticsDto } from '@ap3/api';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { FinancialRoles } from '../../../shared/constants/financial-roles';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { TradeReceivableService } from '../../../shared/services/trade-receivable/trade-receivable.service';

@Component({
  selector: 'app-unpaid-statistics',
  templateUrl: './unpaid-statistics.component.html',
  styleUrl: './unpaid-statistics.component.scss',
})
export class UnpaidStatisticsComponent {
  creditorStatisticsDto$: Observable<UnpaidTrStatisticsDto>;
  debtorStatisticsDto$: Observable<UnpaidTrStatisticsDto>;

  constructor(
    private readonly tradeReceivablesService: TradeReceivableService,
    readonly authService: AuthService
  ) {
    this.creditorStatisticsDto$ = tradeReceivablesService.getUnPaidTradeReceivablesStatistics(FinancialRoles.CREDITOR);
    this.debtorStatisticsDto$ = tradeReceivablesService.getUnPaidTradeReceivablesStatistics(FinancialRoles.DEBTOR);
  }
}
