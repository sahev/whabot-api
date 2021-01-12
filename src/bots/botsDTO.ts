export class addBotsDTO {
  bot_name: string
  bot_enabled: boolean
  bot_user: string
}

export class alterBotsDTO {
  bot_name: string
  bot_enabled: boolean
}

export class setBotStatusDTO {
  bot_status: string
}