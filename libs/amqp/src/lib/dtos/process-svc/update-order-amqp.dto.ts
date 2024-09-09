import {OrderAmqpDto} from "../order-amqp.dto";
import {PickType} from "@nestjs/swagger";

export class UpdateOrderAmqpDto extends PickType(OrderAmqpDto, ['id', 'productId', 'amount','dueMonth', 'customerId']) {

}
