import { PickType } from '@nestjs/swagger';
import { OrderAmqpDto } from './order-amqp.dto';

export class UpdateOrderAmqpDto extends PickType(OrderAmqpDto, ['id', 'productId', 'amount', 'year', 'calendarWeek', 'customerId']) {}
