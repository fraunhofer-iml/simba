import {OfferDto, OrderOverviewDto, ProductDto} from '@ap3/api';
import {Injectable} from '@nestjs/common';
import {OrderAmqpDto} from '@ap3/amqp';

@Injectable()
export class DtoConversionService {
  async toOrderOverviewDto(dto: OrderAmqpDto, productDto: ProductDto, offerDto: OfferDto): Promise<OrderOverviewDto> {
    const overviewDto: OrderOverviewDto = new OrderOverviewDto(
      dto.id,
      productDto,
      dto.amount,
      dto.dueMonth,
      dto.creationDate,
      dto.status,
      offerDto ? offerDto.price : 0,
      dto.robots,
      dto.customerId
    )
    return overviewDto;
  }
}
