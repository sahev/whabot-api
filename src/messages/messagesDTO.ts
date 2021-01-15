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