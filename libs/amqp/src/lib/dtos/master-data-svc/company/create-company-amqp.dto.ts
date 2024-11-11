import { OmitType } from '@nestjs/swagger';
import { CompanyAmqpDto } from '../../company-amqp.dto';

export class CreateCompanyAmqpDto extends OmitType(CompanyAmqpDto, ['id'] as const) {}
