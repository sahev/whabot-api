/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { WorkflowsServices } from "./workflows.service";
import { WorkflowsDTO } from "./workflowsDTO";
import { Controller, Get } from "@nestjs/common";
import { saveBrowserData } from "../sessions/saveBrowserData";
import { Workflows } from '../entities/index'
import { Utils } from '../utils'
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";



@Controller()
export default class WorkflowsController {
  constructor(public workflowsServices: WorkflowsServices) { }

  @Get('getinitials')
  async getInitials() {
    return await this.workflowsServices.getInitials();
  }
}
