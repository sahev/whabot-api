import { QueueService } from "./queue.service";
export default class QueueController {
    private queueService;
    constructor(queueService: QueueService);
    postInMessageQueue(data: any): import("rxjs").Observable<Object>;
}
