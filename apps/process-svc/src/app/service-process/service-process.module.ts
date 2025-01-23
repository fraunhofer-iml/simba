import { DatabaseModule } from '@ap3/database';
import { Module } from '@nestjs/common';
import { ServiceProcessController } from './service-process.controller';
import { ServiceProcessService } from './service-process.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ServiceProcessController],
  providers: [ServiceProcessService],
})
export class ServiceProcessModule {}
