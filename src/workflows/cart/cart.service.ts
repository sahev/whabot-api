import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Carts, Products, Workflows } from "../../entities/index";
import { getManager, getRepository, Repository } from "typeorm";
import { CartsDTO } from "./cartDTO";
import { WorkflowsDTO } from "../workflowsDTO";

@Injectable()
export class CartsService {

  constructor(
    @InjectRepository(Carts) private CartsRepository: Repository<Carts>
  ) {}

  async addItem(data: CartsDTO) {
    return this.CartsRepository.save(data)
  }

  async getCart(data: string) {
    
    let cart = "";
    let tot = 0;
    
    const cartitems = await getRepository(Products).find({relations: ['pro_product']});
    console.log(cartitems);

    cartitems.forEach(res => {
      cart += `${res.pro_product} - ${res.pro_name}        R$ ${res.pro_price} \n`;
      
      tot += res.pro_price;
    });
    cart+= "----------------\n"
    cart+= `Total de R$${tot}`
    
    return cart
  }
}
