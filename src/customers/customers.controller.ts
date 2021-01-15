/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CustomersServices } from "./customers.service";
import { Body, Controller, Param, Patch, Post}  from "@nestjs/common";

@Controller()
export default class CustomersController {
  constructor(private customersServices: CustomersServices) {}


}
