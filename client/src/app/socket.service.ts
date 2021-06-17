import { Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';
import { noop, Observable } from 'rxjs';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private readonly logger: LogService, private readonly socket: Socket) { }

  public emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

  public syncUpdates(event: string): Observable<any> {
    this.logger.log("SyncUpdates: " + event);
    return new Observable((observer) => {
      this.socket.on(event, (data: any) => {
        observer.next(data);
      })
    })
  }

  public changeDoc(event: string) {
    this.socket.emit(event + ':save');
  }

  public unsyncUpdates(event: string): void {
    this.logger.log('UnSyncUpdates: ' + event);
    this.socket.removeListener(event);
  }

  public unSyncAllUpdates(): void {
    this.logger.log('UnSyncedAllUpdates');
    this.socket.removeAllListeners();
  }

  public connected(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('connected', (data: any) => {
        observer.next(data);
      })
    })
  }

}
