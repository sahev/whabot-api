import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Carts, Products, Workflows } from "../entities/index";
import { Repository } from "typeorm";
import { WorkflowsDTO, setStageDTO } from "./workflowsDTO";
import { ProductsServices } from '../products/products.service'
import { CartsService } from "./cart/cart.service";

@Injectable()
export class WorkflowsServices {


  constructor(
    @InjectRepository(Workflows) public workflowsRepository: Repository<Workflows>,
    @InjectRepository(Products) public productsRepository: Repository<Products>,
    @InjectRepository(Carts) private CartsRepository: Repository<Carts>
  ) {}

  async getInitials(data, message) {
    let ret = ""
    let itemName = ""
    let products = await this.getProducts()

    console.log(message.body, message.isGroupMsg, await this.getStage(data.bot_bot));
    if( await this.getStage(data.bot_bot) === 0 ) {
    return await new ProductsServices(this.productsRepository, this.workflowsRepository).getInitials(data);  
    }
  if( await this.getStage(data.bot_bot) === 1 ) {
    if ( !message.isGroupMsg && message.body === "*" ) {
      console.log(message.body, message.isGroupMsg, "stage: 1", "cancelar pedido");
      
      await this.setStage({
        wor_workflow: 1, 
        wor_bot: data.bot_bot,
        wor_user: data.bot_user, 
        wor_stage: 0, 
        wor_cart: ""
      })
      return "Pedido cancelado com sucesso";
    }
  

    await products.filter((res) => {
      if (res.pro_product === parseInt(message.body)) {
        console.log("existe");
        
        return true; 
      }
      console.log("não existe");
      return false;
    }).map(async (res) => {       
      console.log("adicionado");
      
      await new CartsService(this.CartsRepository).addItem({
      car_items: res.pro_name,
      car_user: data.bot_user
    })

    itemName = res.pro_name
 
  
  });
  
  }


    // if (!cardapio.menu[msg]) {
    //   return [
    //     "Código inválido, digite corretamente",
    //     "```Digite # para finalizar ou * para cancelar```",
    //   ];
    // }
    if (itemName === "") {
      return 'Código inválido, digite novamente \n\nDigite # para finalizar ou * para cancelar'
    }
    
    return `${itemName} adiconado com sucesso  \n\nDigite # para finalizar ou * para cancelar` 

  }

  async getStage(data: any) {
    let stage = await this.workflowsRepository.findOne(data)
    return stage.wor_stage
  }

  async setStage(data: WorkflowsDTO) {
    return await this.workflowsRepository.save(data)    
  }

  async getProducts() {
    return await this.productsRepository.find();  
  }

}
