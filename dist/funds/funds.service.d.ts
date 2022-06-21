import { FundsStructureDTO } from "./fundsDTO";
export declare class FundsService {
    getFund(fund: any): Promise<FundsStructureDTO>;
    onMessage(message: any): Promise<string>;
    createFundObj(fund: any): Promise<FundsStructureDTO>;
}
