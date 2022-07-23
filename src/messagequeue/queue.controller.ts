import { QueueService } from "./queue.service";
import { Body, Controller, Post } from "@nestjs/common";

@Controller('queue')
export default class QueueController {
    
    constructor(private queueService: QueueService) { }

    @Post() 
    postInMessageQueue(@Body() data) {
        return this.queueService.postInMessageQueue(data);
    }
} 
