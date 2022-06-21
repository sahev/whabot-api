import { IsNotEmpty } from "class-validator"

export class TemplatesDTO {
  @IsNotEmpty()
  tem_name: string
  
  @IsNotEmpty()
  tem_message: string
}
