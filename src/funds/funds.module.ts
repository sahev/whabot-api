import { Module } from '@nestjs/common';
import { FundsService } from './funds.service';
import FundsController from './funds.controller';

@Module({
  controllers: [FundsController],
  imports: [],
  providers: [FundsService],
  exports: [FundsService],
})
export class FundsModule {}
