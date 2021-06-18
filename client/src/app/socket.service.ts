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

  public listen(event: string): Observable<any> {
    this.logger.log("Listen: " + event);
    return new Observable((observer) => {
      this.socket.on(event, (data: any) => {
        observer.next(data);
      })
    })
  }

  public syncUpdates(model: string, array: any[]): any {
    this.logger.log('SyncUpdates: ' + model);
    this.listen(model + ':save').subscribe((item: any) => {
      var oldItem = array.find((i) => i._id === item._id);
      var index = array.indexOf(oldItem);

      console.log(`${model}:save`);
      console.log("oldItem");
      console.log(oldItem);

      console.log("newItem");
      console.log(item);

      console.log("index: " + index);

      if (oldItem) {
        // Item Updated
        this.logger.log(model + ':save:updated');
        array.splice(index, 1, item);
      } else {
        // Item Created
        this.logger.log(model + ':save:created');
        array.push(item);
      }
    });

    this.listen(model + ':remove').subscribe((item: any) => {
      // Item Deleted
      this.logger.log(model + ':remove');
      var oldItem = array.find((i) => i._id === item._id);
      var index = array.indexOf(oldItem);
      array.splice(index, 1);

      console.log(`${model}:delete`);
      console.log('oldItem');
      console.log(oldItem);

      console.log('newItem');
      console.log(item);

      console.log('index: ' + index);
    })
  }

  public unsyncUpdates(model: string): void {
    this.logger.log('UnSyncUpdates: ' + model);
    this.socket.removeAllListeners(model + ':save');
    this.socket.removeAllListeners(model + ':remove');
  }

  public unSyncAllUpdates(): void {
    this.logger.log('UnSyncedAllUpdates');
    this.socket.removeAllListeners();
  }

  public connected(): Observable<any> {
    return new Observable((obs) => {
      this.socket.on('connected', () => obs.next())
    })
  }

}
