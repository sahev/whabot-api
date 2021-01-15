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
    let { from, body } = message;
    let { name } = message.sender;
    let errcount = 1;

    let {
      wor_stage,
      wor_workflow,
      wor_bot,
      wor_cart,
      wor_user,
    } = await this.getWorkflowByUser(from, data.bot_bot);

    let shortcut = await this.getMessagesShortcuts(body);

    if (wor_stage === 0) {
      console.log("mensagem inicial e menu");

      return [
        `Olá *${name}*!\n` + (await this.getMessagesType("init")).toString(),
        (
          await new ProductsServices(
            this.productsRepository,
            this.workflowsRepository,
            this.messagesRepository
          ).getInitials(wor_workflow, wor_bot, wor_user)
        ).toString(),
      ];
    }

    if (wor_stage === 1) {
      console.log("estágio 1");

      if (shortcut === "help") {
        console.log("cancelar pedido estagio 1", shortcut);

      }

      if (shortcut === "stepcancel") {
        console.log("cancelar pedido estagio 1", shortcut);

        await this.setStage({
          wor_workflow,
          wor_bot,
          wor_user: from,
          wor_stage: 0,
          wor_cart: "",
        });
        await this.delCart(from)
        return [
          `${await this.getMessagesType("cancel")}\n`
        ];
      }

      if (shortcut === "stepfinish") {
        console.log("finalizar pedido estagio 1", shortcut);
        
        await this.setStage({
          wor_workflow,
          wor_bot,
          wor_user: from,
          wor_stage: 2,
          wor_cart,
        });
        return [
          await this.getMessagesType("finishorder"),
          await this.getMessagesType("address"),
        ];
      }

      if (shortcut === "steporder") {
        console.log("listar carrinho estagio 1", shortcut);
        return [
          await this.getMessagesType("listcart"),
          await this.getCart(from),
        ];
      }

      if (shortcut === "steplistproducts") {
        console.log("listar produtos estagio 1", shortcut);
        return [
          await this.listProducts(), 
          await this.getMessagesType("step")
        ];
      }

      await products.map(async (res) => {
        if (res.pro_product === parseInt(body)) {
          this.addItem({
            product: res.pro_product,
            user: from,
          });
          console.log("adiciona produto", res.pro_product, from);
          itemName = res.pro_name;
        }
      });
    }

    if (wor_stage === 2) {
      if (shortcut === "steplistproducts") {
        console.log("listar produtos estagio 2", shortcut);
        return [await this.listProducts(), await this.getMessagesType("step")];
      }

      if (body.includes("rua")) {
        console.log("tem rua");
        return
      } else console.log("não tem rua");
      return
    }

    if (itemName === "" ) {
        return [
          await this.getMessagesType("error"),
          await this.getMessagesType("help"),
        ];
    }

    console.log("produto adicionado");

    return [
      `${itemName} ` + (await this.getMessagesType("addsuccess"))
    ];
  }

  async getStage(data: any) {
    let stage = await this.workflowsRepository.findOne(data);
    return stage.wor_stage;
  }

  async setStage(data: WorkflowsDTO) {
    return await this.workflowsRepository.save(data);
  }

  async getProducts() {
    return await this.productsRepository.find();
  }

  async listProducts() {
    return await new ProductsServices(
      this.productsRepository,
      this.workflowsRepository,
      this.messagesRepository
    ).listProducts();
  }

  async getCart(data) {
    return await new CartsService(this.CartsRepository).getCart(data);
  }

  async getMessagesType(data: any) {
    let m = await new MessagesService(this.messagesRepository).getMessagesType(data);
    let step = "";

    if (m.length > 1) {
      m.forEach((res) => {
        if (res.mes_options === "step" ) {
          step += `*${res.mes_shortcut}* ${res.mes_body}; `;
        }
      });
      return step;
    }
    return m[0].mes_body;
  }

  async getMessagesShortcuts(data: any) {
    let e = await new MessagesService(
      this.messagesRepository
    ).getMessagesShortcuts(data);
    
    return e;
  }

  async addItem(data: any) {
    let r = await new CartsService(this.CartsRepository).addItem({
      car_product: data.product,
      car_user: data.user,
    });
    return r;
  }

  async saveWorkflow(data: any) {
    let { car_user, car_cart } = data;

    return await this.workflowsRepository.save({
      wor_user: car_user,
      wor_cart: car_cart,
    });
  }

  async getWorkflowByUser(wor_user: any, botid?: any) {
    let r = await this.workflowsRepository.findOne({ wor_user });

    if (r === undefined) {
      let n = await this.newWorkflow({
        wor_user,
        wor_bot: botid,
        wor_cart: "",
        wor_stage: 0,
      });
      return n;
    }
    return r;
  }

  async newWorkflow(data: newWorkflowDTO) {
    let r = await this.workflowsRepository.save(data);
    return r;
  }

  async delCart(data) {
    return await new CartsService(this.CartsRepository).deleteCart(data);
  }

}
