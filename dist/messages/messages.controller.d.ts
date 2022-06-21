import { MessagesService } from "./messages.service";
import { sendMessagesDTO, MessagesDTO, SendMessagesCampaignDTO } from "./messagesDTO";
export default class MessagesController {
    private messagesServices;
    constructor(messagesServices: MessagesService);
    sendMessage(data: sendMessagesDTO): Promise<string | object>;
    newMessage(data: MessagesDTO): Promise<MessagesDTO & import("../entities").Messages>;
    sendMessages(sendMessagesDto: SendMessagesCampaignDTO): Promise<any>;
}
