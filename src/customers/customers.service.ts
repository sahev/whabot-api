import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Customers } from "../entities/index";

@Injectable()
export class CustomersServices {
  constructor(
    @InjectRepository(Customers) private customersRepository: Repository<Customers>
  ) {}

  
}
