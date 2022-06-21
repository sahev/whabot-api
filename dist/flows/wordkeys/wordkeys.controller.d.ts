import { WordKeysServices } from "./wordkeys.service";
import { WordKeysDTO } from "./wordkeys.dto";
export declare class WordKeysController {
    private wokServices;
    constructor(wokServices: WordKeysServices);
    getAllWfs(): Promise<import("./wordkeys.entities").WordKeys[]>;
    getwordkeyByStage(wok_stage: WordKeysDTO): Promise<import("./wordkeys.entities").WordKeys[]>;
    newStage(data: WordKeysDTO): Promise<string | object>;
    deleteWordkey(wok_wordkey: WordKeysDTO): Promise<import("typeorm").DeleteResult>;
}
