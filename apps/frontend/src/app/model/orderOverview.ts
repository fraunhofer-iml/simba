import { OrderOverviewDto } from '@ap3/api';
import { TranslateService } from '@ngx-translate/core';
import { OrderStatus } from '../pages/orders/orders-overview/enum/orderStatus';
import { DateFormatService } from '../shared/formats/date-format.service';

export class OrderOverview {
  id: string | undefined;
  product: string | undefined;
  amount: number | undefined;
  year: number | undefined;
  calendarWeek: number | undefined;
  creationDate: string | undefined;
  status: string | undefined;
  statusTimestamp: string | undefined;
  price: string | undefined;
  robots: string[] | undefined;
  customerId: string | undefined;

  public static convertToOrderOverview(
    orders: OrderOverviewDto[],
    dateFormatService: DateFormatService,
    translate: TranslateService
  ): OrderOverview[] {
    const flatOrders: OrderOverview[] = [];
    orders.forEach((order: OrderOverviewDto) => {
      const temp: OrderOverview = new OrderOverview();
      temp.id = order.id;
      temp.status = order.status;
      temp.creationDate = this.getDateBasedOnStatus(order, dateFormatService, translate);
      temp.robots = order.robots.flat();
      temp.price = `${order.price.toFixed(2)}€`;
      temp.product = order.product.name;
      temp.amount = order.amount;
      temp.robots = order.robots;
      temp.customerId = order.customerId;
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
