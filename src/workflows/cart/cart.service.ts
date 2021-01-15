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
    
    let e = await  this.CartsRepository.save(data)
    console.log("add item",e);
    
    return e
  }

  async getCart(data: string) {
    
    let cart = "";
    let tot = 0;
    
    const cartitems = await getRepository(Carts).find({where: {car_user: data}, relations: ['car_product']});

    cartitems.forEach(res => {
      const { pro_product, pro_name, pro_price } = JSON.parse(JSON.stringify(res.car_product))
      cart += `${pro_product} - ${pro_name}        R$ ${pro_price} \n`;
      
      tot += parseFloat(pro_price);

    });
    cart+= "--------------------\n"
    cart+= `Total de R$${tot.toFixed(2)}`
    
    return cart
  }

  async deleteCart(data) {
    let e = await this.CartsRepository.delete({ car_user: data })
    return e
  }

}
