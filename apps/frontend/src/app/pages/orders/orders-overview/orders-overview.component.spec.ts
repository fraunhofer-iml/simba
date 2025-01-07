import { OrderOverviewDto } from '@ap3/api';
import { TranslateModule } from '@ngx-translate/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { DatePipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DateFormatService } from '../../../shared/formats/date-format.service';
import { LANGUAGEFORMATS } from '../../../shared/formats/formats';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { OrdersService } from '../../../shared/services/orders/orders.service';
import { OrderStatus } from './enum/orderStatus';
import { OrdersOverviewComponent } from './orders-overview.component';

describe('OrdersOverviewComponent', () => {
  let component: OrdersOverviewComponent;
  let fixture: ComponentFixture<OrdersOverviewComponent>;
  let datePipe: DatePipe;
  const mockKeyCloakService = {
    isLoggedIn: jest.fn().mockResolvedValue(true),
    hasResourceRole: jest.fn().mockReturnValue(true),
    isUserInRole: jest.fn().mockReturnValue(true),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatCardModule,
        MatDividerModule,
        MatListModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatButtonModule,
        MatNativeDateModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        NoopAnimationsModule,
        RouterModule.forRoot([]),
        TranslateModule.forRoot(),
        KeycloakAngularModule,
      ],
      providers: [
        OrdersService,
        provideHttpClient(),
        DatePipe,
        DateFormatService,
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
      declarations: [OrdersOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersOverviewComponent);
    datePipe = TestBed.inject(DatePipe);
    datePipe = TestBed.inject(DatePipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return calendarWeek for status planned', () => {
    const order: OrderOverviewDto = <OrderOverviewDto>{
      id: '1234',
      product: {
        name: 'Quadrokopter',
        id: 'prod1',
      },
      amount: 2,
      year: 2024,
      calendarWeek: 50,
      creationDate: '2024-10-02T10:55:55.695Z',
      status: OrderStatus.planned,
      statusTimestamp: '2024-10-09T07:55:55.695Z',
      price: 2,
      robots: [],
      customerId: 'pt0001',
    };

    const result = component.getDateBasedOnStatus(order);
    expect(result).toBe('CalendarWeek 50');
  });

  it('should return formatted date for status produced', () => {
    const order: OrderOverviewDto = <OrderOverviewDto>{
      id: '1234',
      product: {
        name: 'Quadrokopter',
        id: 'prod1',
      },
      amount: 2,
      year: 2024,
      calendarWeek: 50,
      creationDate: '2024-10-02T10:55:55.695Z',
      status: OrderStatus.produced,
      statusTimestamp: '2024-10-09T07:55:55.695Z',
      price: 2,
      robots: [],
      customerId: 'pt0001',
    };

    const date = '2023-11-18 10:00';
    jest.spyOn(datePipe, 'transform').mockReturnValue(date);

    const result = component.getDateBasedOnStatus(order);

    expect(result).toBe(date);
    expect(datePipe.transform).toHaveBeenCalledWith(order.statusTimestamp, LANGUAGEFORMATS.DE);
  });
});
