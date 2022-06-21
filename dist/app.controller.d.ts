import { AppService } from './app.service';
import { VenomService } from './venom/venom.service';
export declare class AppController {
    private readonly appService;
    private readonly venomService;
    constructor(appService: AppService, venomService: VenomService);
    getHello(): string;
    startVenom(): Promise<void>;
}
