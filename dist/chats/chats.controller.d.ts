import { ChatsServices } from "./chats.service";
import { ChatsDTO } from "./chats.dto";
export default class ChatsController {
    private chatsServices;
    constructor(chatsServices: ChatsServices);
    setMessage(data: ChatsDTO): Promise<ChatsDTO & import("./chats.entities").Chats>;
    getMessages(cha_customer: ChatsDTO): Promise<import("./chats.entities").Chats[]>;
}
