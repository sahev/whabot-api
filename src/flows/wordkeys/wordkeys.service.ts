import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WordKeysDTO } from './wordkeys.dto';
import { WordKeys } from './wordkeys.entities';

@Injectable()
export class WordKeysServices {
  constructor(
    @InjectRepository(WordKeys) private wordkeysRepository: Repository<WordKeys>) {

  }

  async findAll() {
    return await this.wordkeysRepository.find();
  }

  async newWordKey(data: WordKeysDTO) {
    try {
      return await this.wordkeysRepository.save(data)
    } catch {
      return new BadRequestException(
        "Word key already exists for the same stage."
      ).getResponse();
    }
  }

  async wordkeyByStage(wok_stage: WordKeysDTO) {
    return await this.wordkeysRepository.find(wok_stage)
  }

  async deleteWordkey(wok_wordkey: WordKeysDTO) {
    return await this.wordkeysRepository.delete(wok_wordkey)
  }
}
