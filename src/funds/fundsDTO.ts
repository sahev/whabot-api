export class FundsStructureDTO {
  ticker: string
  dividend_yield: string
  last_yield: string
  net_worth: string
  equity_value: string
  notes: string
  price: {
    current: string
    current_eval: string
    eval_last12month: string
  }
  administrator: {
    adm_name: string
    adm_cnpj: string
    adm_phone: string
    adm_email: string
    adm_site: string
  }
}
