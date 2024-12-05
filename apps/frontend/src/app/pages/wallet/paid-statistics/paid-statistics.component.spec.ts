import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { TradeReceivableService } from '../../../shared/services/trade-receivable/trade-receivable.service';
import { PaidStatisticsComponent } from './paid-statistics.component';

jest.mock('ng2-charts', () => ({
  BaseChartDirective: jest.fn().mockImplementation(() => ({
    ngOnInit: jest.fn(),
    ngOnChanges: jest.fn(),
    update: jest.fn(),
  })),
}));

describe('PaidStatisticsComponent', () => {
  let component: PaidStatisticsComponent;
  let fixture: ComponentFixture<PaidStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaidStatisticsComponent],
      providers: [TradeReceivableService, provideHttpClient(), { provide: TranslatePipe, useValue: jest.fn((value: string) => value) }],
      imports: [TranslateModule.forRoot(), MatMenuModule],
      schemas: [NO_ERRORS_SCHEMA], // since provideCharts(withDefaultRegisterables()) doesnt get recognized as a function, canvas cant be given the datasets property
    }).compileComponents();

    fixture = TestBed.createComponent(PaidStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
