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
    
    const cartitems = await getRepository(Carts).find({where: {car_user: data}, relations: ['car_product']});

    cartitems.forEach(res => {
      const {car_product} = res
      cart += `${car_product.pro_product} - ${car_product.pro_name}        R$ ${car_product.pro_price} \n`;
      
      tot += parseFloat(car_product.pro_price);
      console.log(cart, tot);

    });
    cart+= "----------------\n"
    cart+= `Total de R$${tot.toFixed(2)}`
    
    return cart
  }
}
