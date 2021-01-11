import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/index';
import { Repository } from 'typeorm';
import { UsersDTO } from './usersDTO';

@Injectable()
export class UsersService {
  private readonly users: Users[];

  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>) {

  }

  findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async create(data: UsersDTO) {
    const user = await this.usersRepository.create(data);
    try {
      let checkexists = await this.usersRepository.findOne({ usr_email: data.usr_email });
      if (checkexists.usr_email === data.usr_email) {
        return new BadRequestException('Cadastro existente');
      }
    } catch {
      await this.usersRepository.save(user);
      return user;
    }
  }
}