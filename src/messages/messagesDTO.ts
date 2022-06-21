import { IsNotEmpty } from 'class-validator';

export class sendMessagesDTO {
  client: string
  number: string
  text: string
}

export class MessagesDTO {
  mes_bot: number
  mes_body: string
  mes_options: string
  mes_type: string
}

export class botMessagesDTO {
  mes_bot: number
  mes_body: string
  mes_expected: string
}
 
export class SendMessagesCampaignDTO {
  @IsNotEmpty()
  botId: string;

  @IsNotEmpty()
  columnSheet: any[];

  @IsNotEmpty()
  message: string;
}

export class CampaignHistoryDTO {

  @IsNotEmpty()
  cah_campaign: number;

  cah_bot: number;

  @IsNotEmpty()
  cah_to: string;

  @IsNotEmpty()
  cah_erro: boolean;

  @IsNotEmpty()
  cah_message: string;

  cah_messageerror: string;
}