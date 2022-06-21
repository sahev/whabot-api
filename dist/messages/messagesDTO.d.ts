export declare class sendMessagesDTO {
    client: string;
    number: string;
    text: string;
}
export declare class MessagesDTO {
    mes_bot: number;
    mes_body: string;
    mes_options: string;
    mes_type: string;
}
export declare class botMessagesDTO {
    mes_bot: number;
    mes_body: string;
    mes_expected: string;
}
export declare class SendMessagesCampaignDTO {
    botId: string;
    columnSheet: any[];
    message: string;
}
export declare class CampaignHistoryDTO {
    cah_campaign: number;
    cah_bot: number;
    cah_to: string;
    cah_erro: boolean;
    cah_message: string;
    cah_messageerror: string;
}
