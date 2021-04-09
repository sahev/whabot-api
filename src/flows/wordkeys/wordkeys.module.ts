import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordKeysController } from './wordkeys.controller';
import { WordKeys } from './wordkeys.entities';
import { WordKeysServices } from './wordkeys.service';

@Module({
  controllers: [WordKeysController],
  imports: [TypeOrmModule.forFeature([WordKeys])],
  providers: [WordKeysServices],
  exports: [WordKeysServices],
})
export class WordKeysModule {}
