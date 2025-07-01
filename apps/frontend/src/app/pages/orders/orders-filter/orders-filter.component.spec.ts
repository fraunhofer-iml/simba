import { TranslateModule } from '@ngx-translate/core';
import { KeycloakService } from 'keycloak-angular';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderFilter } from '../../../model/order-filter';
import { AutocompleteCompanyFilterComponent } from '../../../shared/components/filter/autocomplete-company-filter/autocomplete-company-filter.component';
import { CheckboxFilterComponent } from '../../../shared/components/filter/checkbox-filter/checkbox-filter.component';
import { DateRangeFilterComponent } from '../../../shared/components/filter/date-range-filter/date-range-filter.component';
import { FilterModule } from '../../../shared/components/filter/filter.module';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { FilterService } from '../../../shared/services/filter/filter.service';
import { OrdersService } from '../../../shared/services/orders/orders.service';
import { OrdersFilterComponent } from './orders-filter.component';

describe('OrdersFilterComponent', () => {
  let component: OrdersFilterComponent;
  let fixture: ComponentFixture<OrdersFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), FilterModule, BrowserAnimationsModule],
      providers: [
        FilterService<OrderFilter>,
        OrdersService,
        AuthService,
        {
          provide: KeycloakService,
          useValue: {
            getKeycloakInstance: jest.fn().mockReturnValue({
              profile: {
                attributes: {
                  company: ['pt0001'],
                },
              },
            }),
            getUserRoles: jest.fn().mockReturnValue([]),
          },
        },
      ],
      declarations: [OrdersFilterComponent, AutocompleteCompanyFilterComponent, CheckboxFilterComponent, DateRangeFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
