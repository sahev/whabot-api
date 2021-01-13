export class WorkflowsDTO {
  wor_workflow: number
  wor_user: string
  wor_bot: number
  wor_stage: number
  wor_cart: string
}

export class newWorkflowDTO {
  wor_user: string
  wor_bot: number
  wor_stage: number
  wor_cart: string
}

export class setStageDTO {
  wor_stage: string
}

export class setCart {
  wor_cart: string
  wor_user: string
}