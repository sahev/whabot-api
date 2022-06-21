import { Repository } from 'typeorm';
import { WordKeysDTO } from './wordkeys.dto';
import { WordKeys } from './wordkeys.entities';
export declare class WordKeysServices {
    private wordkeysRepository;
    constructor(wordkeysRepository: Repository<WordKeys>);
    findAll(): Promise<WordKeys[]>;
    newWordKey(data: WordKeysDTO): Promise<string | object>;
    wordkeyByStage(wok_stage: WordKeysDTO): Promise<WordKeys[]>;
    deleteWordkey(wok_wordkey: WordKeysDTO): Promise<import("typeorm").DeleteResult>;
}
