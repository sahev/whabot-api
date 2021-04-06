/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ProductsServices } from "./products.service";
import { ProductsDTO } from "./productsDTO";
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post
} from "@nestjs/common";
import { BrowserData } from "../sessions/BrowserData";
import { Products } from '../entities/index'
import { Utils } from '../utils'
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";



@Controller()
export default class ProductsController {
  constructor(public productsServices: ProductsServices) { }

  @Post("products/")
  async newProduct(@Body() data: ProductsDTO) {
    return this.productsServices.newProduct(data)
  }

  @Get("products")
  async getInitials() {
    // return this.productsServices.getInitials();
  }
}
