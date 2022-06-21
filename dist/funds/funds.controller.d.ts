import { FundsService } from "./funds.service";
import { FundsStructureDTO } from "./fundsDTO";
export default class MessagesController {
    private fundsService;
    constructor(fundsService: FundsService);
    getFund(fund: string): Promise<FundsStructureDTO>;
}
