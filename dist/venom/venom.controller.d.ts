import { VenomService } from './venom.service';
export declare class VenomController {
    private readonly venomService;
    constructor(venomService: VenomService);
    getHello(): string;
}
