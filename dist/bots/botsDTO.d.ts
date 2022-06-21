export declare class addBotsDTO {
    bot_name: string;
    bot_enabled: boolean;
    bot_user: string;
    bot_description: string;
    bot_type: number;
    bot_model: string;
    bot_qrcode: string;
}
export declare class alterBotsDTO {
    bot_name: string;
    bot_enabled: boolean;
}
export declare class setBotStatusDTO {
    bot_status: string;
}
export declare class getBotsDTO {
    bot_user: string;
}
export declare class setBotQrCode {
    bot_bot: number;
    bot_qrcode: string;
}
