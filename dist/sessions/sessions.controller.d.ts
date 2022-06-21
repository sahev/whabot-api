import { SessionsService } from "./sessions.service";
export default class SessionsController {
    private sessionsServices;
    constructor(sessionsServices: SessionsService);
    logout(id: string): Promise<void>;
    getTokenBrowser(data: string): Promise<string | object>;
    getQrCode(data: any): Promise<void>;
    getBotStatus(botId: string): Promise<any>;
}
