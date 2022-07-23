import { MessagesService } from "./messages.service";
import { sendMessagesDTO, MessagesDTO, SendMessagesCampaignDTO } from "./messagesDTO";
import { BadRequestException } from "@nestjs/common";
export default class MessagesController {
    private messagesServices;
    constructor(messagesServices: MessagesService);
    sendMessage(data: sendMessagesDTO): Promise<BadRequestException | import("@nestjs/common").InternalServerErrorException | {
        status: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    newMessage(data: MessagesDTO): Promise<MessagesDTO & import("../entities").Messages>;
    sendMessages(sendMessagesDto: SendMessagesCampaignDTO): Promise<any>;
}
