import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
export declare class QueueService {
    private readonly httpService;
    constructor(httpService: HttpService);
    postInMessageQueue(data: any): Observable<Object>;
    connectMessageQueue(): Observable<Object>;
    closeConnection(): Observable<Object>;
}
