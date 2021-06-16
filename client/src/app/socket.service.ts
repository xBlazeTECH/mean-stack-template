import { Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';
import { noop } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private readonly socket: Socket) { }

  syncUpdates(modelName: string, array: any[]): Promise<any> {

    /**
     * Syncs item creation/updates on 'model:save'
     */
    this.socket.on(modelName + ':save', (item) => {
      let oldItem = array.find(array, {_id: item._id});
      let index = array.indexOf(oldItem);
    })
  }

  unsyncUpdates(): void {

  }


}
