import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class QueueService { 
  /**
   *
   */
  constructor(private readonly httpService: HttpService) {
  }

    postInMessageQueue(data: any): Observable<Object>  {
      let res;
      try {
        res = this.httpService.post('http://localhost:3002/queue/message/', data);
        return res
      } catch {
        res = {}
      }
      return res;
    }

    connectMessageQueue(): Observable<Object>  {
      let res;
      try {
        res = this.httpService.post('http://localhost:3002/queue/connect');
        return res
      } catch {
        res = {}
      }
      return res;
    }

    closeConnection(): Observable<Object>  {
      let res;
      try {
        res = this.httpService.delete('http://localhost:3002/queue/close');
        return res
      } catch {
        res = {}
      }
      return res;
    }
}