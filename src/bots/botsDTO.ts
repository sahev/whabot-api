export class addBotsDTO {
  bot_name: string
  bot_enabled: boolean
  bot_user: string
  bot_description: string
  bot_type: number
  bot_model: string
  bot_qrcode: string
}

export class alterBotsDTO {
  bot_name: string
  bot_enabled: boolean
}

export class setBotStatusDTO {
  bot_status: string
  bot_lastStatus?: string
}

export class getBotsDTO {
  bot_user: string
}

export class setBotQrCode {
  bot_bot: number
  bot_qrcode: string
}