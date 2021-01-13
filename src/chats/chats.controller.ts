/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ChatsServices } from "./chats.service";
import { Body, Controller, Param, Patch, Post}  from "@nestjs/common";

@Controller()
export default class ChatsController {
  constructor(private chatsServices: ChatsServices) {}


}
