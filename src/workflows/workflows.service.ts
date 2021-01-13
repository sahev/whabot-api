import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Carts, Messages, Products, Workflows } from "../entities/index";
import { Repository } from "typeorm";
import { WorkflowsDTO, setStageDTO, newWorkflowDTO } from "./workflowsDTO";
import { ProductsServices } from "../products/products.service";
import { CartsService } from "./cart/cart.service";
import { MessagesService } from "../messages/messages.service";

@Injectable()
export class WorkflowsServices {
  constructor(
    @InjectRepository(Workflows)
    public workflowsRepository: Repository<Workflows>,
    @InjectRepository(Products) public productsRepository: Repository<Products>,
    @InjectRepository(Carts) private CartsRepository: Repository<Carts>,
    @InjectRepository(Messages) public messagesRepository: Repository<Messages>
    
  ) {}

  async getInitials(data, message) {
    let itemName = "";
    let products = await this.getProducts();
    let { from, isGroupMsg , body } = message
    let { name } = message.sender
    
    
    let user = await this.getWorkflowByUser(from, data.bot_bot)

    if ( user.wor_stage === 0 ) {
      console.log("mensagem inicial e menu");

      return [
          `Olá *${name}*!\n` + (await this.getMessagesType("init")).toString(),
          (await new ProductsServices(
            this.productsRepository,
            this.workflowsRepository,
            this.messagesRepository
            ).getInitials(data, user)).toString()
      ];
    }
    if ( user.wor_stage === 1 ) {
    console.log("estágio 1");
    
      if (!isGroupMsg && body === "*") {
        console.log("cancelar pedido");

        await this.setStage({
          wor_workflow: user.wor_workflow,
          wor_bot: user.wor_bot,
          wor_user: from,
          wor_stage: 0,
          wor_cart: "",
        });
        return [
          await this.getMessagesType("cancel")
        ];
      }

      if (!isGroupMsg && body === "#") {
        await this.setStage({
          wor_workflow: user.wor_workflow,
          wor_bot: user.wor_bot,
          wor_user: from,
          wor_stage: 2,
          wor_cart: "",
        });
        return [
          await this.getMessagesType("finishorder")
        ];
      }

      if (!isGroupMsg && body === "0") {

        return [
          await this.getMessagesType("listcart"),
          await this.getCart(from)
        ];
      }

      await products
        .map(async (res) => {
          if (res.pro_product === parseInt(body)) {
          console.log("adicionado");
          this.addItem({
            product: res.pro_product, 
            user: from
          })
          console.log("adiciona produto", res.pro_product, from);
          

          itemName = res.pro_name;
        }
      });
    }

    if (itemName === "") {
      console.log("código inválido");
      
      return [
        await this.getMessagesType("error"),
        await this.getMessagesType("step")
      ];
    }


    console.log("produto adicionado");
    
    return [
      `${itemName} ` + await this.getMessagesType("addsuccess"),
      await this.getMessagesType("step")
    ];
  }

  async getStage(data: any) {
    let stage = await this.workflowsRepository.findOne(data);
    console.log("stagio ", stage);
    
    return stage.wor_stage;
  }

  async setStage(data: WorkflowsDTO) {
    return await this.workflowsRepository.save(data);
  }

  async getProducts() {
    return await this.productsRepository.find();
  }

  async getCart(data) {
    return await new CartsService(this.CartsRepository).getCart(data)
  }

  async getMessagesType(data: any) {
    let {mes_body} = await new MessagesService(this.messagesRepository).getMessagesType(data);

    return mes_body
  }

  async addItem(data: any) {
    let r = await new CartsService(this.CartsRepository).addItem({
      car_product: data.product,
      car_user: data.user,
    });

    return r
  }

  async saveWorkflow(data: any) {
    let {car_user, car_cart} = data
    
    return await this.workflowsRepository.save({wor_user: car_user, wor_cart: car_cart  })
  }

  async getWorkflowByUser(wor_user: any, botid?: any) {

    let r = await this.workflowsRepository.findOne({wor_user})

    if (r === undefined) {
      let n = await this.newWorkflow({
        wor_user: wor_user,
        wor_bot: botid,
        wor_cart: "",
        wor_stage: 0
      })
      return n
    }
    return r 
  }

  async newWorkflow(data: newWorkflowDTO) {
    let r = await this.workflowsRepository.save(data)
    return r
  }
}
