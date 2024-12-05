import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDividerModule } from '@angular/material/divider';
import { TradeReceivableService } from '../../../shared/services/trade-receivable/trade-receivable.service';
import { UnpaidStatisticsComponent } from './unpaid-statistics.component';

describe('UnpaidStatisticsComponent', () => {
  let component: UnpaidStatisticsComponent;
  let fixture: ComponentFixture<UnpaidStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnpaidStatisticsComponent],
      imports: [TranslateModule.forRoot(), MatDividerModule],
      providers: [TradeReceivableService, provideHttpClient(), { provide: TranslatePipe, useValue: jest.fn((value: string) => value) }],
    }).compileComponents();

    fixture = TestBed.createComponent(UnpaidStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
