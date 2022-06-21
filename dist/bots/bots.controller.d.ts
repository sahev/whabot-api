import { BotsServices } from "./bots.service";
export default class BotsController {
    private botsServices;
    constructor(botsServices: BotsServices);
    newBot(data: any): Promise<string | object>;
    editBot(botname: any, data: any): Promise<import("../entities").Bots>;
    getBots(data: any): Promise<import("../entities").Bots[]>;
    startBot(): Promise<string>;
}
