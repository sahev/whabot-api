export class addBotsDTO {
  bot_name: string
  bot_enabled: boolean
  bot_user: string
  bot_description: string
  bot_type: string
  bot_model: string
}

export class alterBotsDTO {
  bot_name: string
  bot_enabled: boolean
}

export class setBotStatusDTO {
  bot_status: string
}

export class getBotsDTO {
  bot_user: string
}