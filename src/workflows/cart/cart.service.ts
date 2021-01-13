import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Carts } from "../../entities/index";
import { Repository } from "typeorm";
import { CartsDTO } from "./cartDTO";

@Injectable()
export class CartsService {

  constructor(
    @InjectRepository(Carts) private CartsRepository: Repository<Carts>
  ) {}

  async addItem(data: CartsDTO) {
    this.CartsRepository.save(data)
  }
}
