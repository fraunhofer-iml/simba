import { OrderOverviewDto } from '@ap3/api';
import { TranslateService } from '@ngx-translate/core';
import { OrderStatus } from '../pages/orders/orders-overview/enum/orderStatus';
import { DateFormatService } from '../shared/services/util/date-format.service';

export class OrderOverview {
  id: string;
  product: string;
  amount: number;
  year: number;
  calendarWeek: number;
  creationDate: string;
  status: string;
  statusTimestamp: string;
  price: string;
  robots: string[];
  customerId: string;

  constructor(order: OrderOverviewDto, formattedCreationDate: string) {
    this.id = order.id;
    this.product = order.product.name;
    this.amount = order.amount;
    this.year = order.year;
    this.calendarWeek = order.calendarWeek;
    this.creationDate = formattedCreationDate;
    this.status = order.status;
    this.statusTimestamp = order.statusTimestamp;
    this.price = `${order.price.toFixed(2)}€`;
    this.robots = order.robots.flat();
    this.customerId = order.customerId;
  }

  public static convertToOrderOverview(
    orders: OrderOverviewDto[],
    dateFormatService: DateFormatService,
    translate: TranslateService
  ): OrderOverview[] {
    const flatOrders: OrderOverview[] = [];
    orders.forEach((order: OrderOverviewDto) => {
      const temp: OrderOverview = new OrderOverview(order, this.getDateBasedOnStatus(order, dateFormatService, translate));
      flatOrders.push(temp);
    });
    return flatOrders;
  }

  private static getDateBasedOnStatus(order: OrderOverviewDto, dateFormatService: DateFormatService, translate: TranslateService): string {
    if (order.status === OrderStatus.planned) {
      return `${translate.instant('CalendarWeek')} ${order.calendarWeek}`;
    } else {
      return dateFormatService.transformDateToCurrentLanguageFormat(order.statusTimestamp);
    }
  }
}
