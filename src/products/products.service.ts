import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Bots, Messages, Products, Workflows } from "../entities/index";
import { Repository } from "typeorm";
import { ProductsDTO } from "./productsDTO";
import { WorkflowsServices } from "../workflows/workflows.service";
import { setStageDTO, WorkflowsDTO } from "../workflows/workflowsDTO";
import { MessagesService } from "../messages/messages.service";

@Injectable()
export class ProductsServices {
  
  constructor(
    @InjectRepository(Products) private productsRepository: Repository<Products>,
    @InjectRepository(Workflows) private workflowsRepository: Repository<Workflows>,
    @InjectRepository(Messages) private messagesRepository: Repository<Messages>
    
  ) {}

  async newProduct(data: ProductsDTO) {
    return this.productsRepository.save(data)
  }

  async getInitials(data: any, user?: any) {

    let products = "";

    let items = await this.productsRepository.find();    

    items.forEach(res => {
      products += `${res.pro_product} - ${res.pro_name}        R$ ${res.pro_price} \n`;
    });
    
    await this.setStage({
      wor_workflow: user.wor_workflow, 
      wor_bot: user.wor_bot,
      wor_user: user.wor_user, 
      wor_stage: 1, 
      wor_cart: ""
    })
    
    return [ 
      products
    ];
  }

  async setStage(data: WorkflowsDTO) {
    return await this.workflowsRepository.save(data)     
  }
  
  async getMessagesType(data) {
    let {mes_body} = await new MessagesService(this.messagesRepository).getMessagesType(data)
    return [mes_body];
  }

}
