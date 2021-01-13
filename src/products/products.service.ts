import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Bots, Products, Workflows } from "../entities/index";
import { Repository } from "typeorm";
import { ProductsDTO } from "./productsDTO";
import { WorkflowsServices } from "../workflows/workflows.service";
import { setStageDTO, WorkflowsDTO } from "../workflows/workflowsDTO";

@Injectable()
export class ProductsServices {
  
  constructor(
    @InjectRepository(Products) private productsRepository: Repository<Products>,
    @InjectRepository(Workflows) private workflowsRepository: Repository<Workflows>
    
  ) {}

  async newProduct(data: ProductsDTO) {
    return this.productsRepository.save(data)
  }

  async getInitials(data: any) {

    let menu = "";

    let items = await this.productsRepository.find();    

    items.forEach(res => {
      menu += `${res.pro_product} - ${res.pro_name}        R$ ${res.pro_price} \n`;
    });
    
    await this.setStage({
      wor_workflow: 1, 
      wor_bot: data.bot_bot,
      wor_user: data.bot_user, 
      wor_stage: 1, 
      wor_cart: ""
    })
    
    return menu
  }

  async setStage(data: WorkflowsDTO) {
    return await this.workflowsRepository.save(data)     
  }
  
}
