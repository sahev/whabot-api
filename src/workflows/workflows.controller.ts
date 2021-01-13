/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { WorkflowsServices } from "./workflows.service";
import { WorkflowsDTO } from "./workflowsDTO";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { saveBrowserData } from "../sessions/saveBrowserData";
import { Workflows } from '../entities/index'
import { Utils } from '../utils'
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";



@Controller()
export default class WorkflowsController {
  constructor(public workflowsServices: WorkflowsServices) { }

  @Post('addItem')
  async getInitials(@Body() data: Workflows) {
  }
}
