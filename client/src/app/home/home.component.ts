import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { LogService } from '../log.service';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public awesomeThings: any[] = [];
  public newThing: any = {};

  constructor(private logger: LogService, private http: HttpClient, private socketService: SocketService) {}

  ngOnDestroy(): void {
    this.socketService.unsyncUpdates('things');
  }

  ngOnInit(): void {
    this.socketService.connected().subscribe((thing: any) => {
      this.setupSockets();
    })
    this.fetchThings();
  }

  setupSockets(): void {
    this.socketService.syncUpdates('pong').subscribe((thing: any) => {
      console.log('Received Ping-Pong');
    });
    this.socketService.syncUpdates('thing:save').subscribe((thing: any) => {
      console.log('Thing Saved');
    });
    this.socketService.syncUpdates('thing:remove').subscribe((thing: any) => {
      console.log('Thing Removed');
    });
    this.socketService.emit('ping', 'Hello World!');
    this.fetchThings();
    this.socketService.syncUpdates('things').subscribe((thing: any) => {
      console.log('Received: ' + thing);
    });
    this.socketService.emit('info', 'Hello World!');
  }

  fetchThings(): void {
    this.logger.log('Fetching Things...');
    this.http.get('/api/things').subscribe((awesomeThings: any) => {
      this.awesomeThings = awesomeThings;
    });
  }

  addThing(): void {
    if (!this.newThing.name || this.newThing.name === '') return;
    this.http.post('/api/things', this.newThing).subscribe((err: any) => {
      if (err) console.log(err);
      this.socketService.changeDoc('thing');
      this.fetchThings();
      this.newThing = {};
    });
  }

  deleteThing(thing: any): void {
    this.http.delete(`/api/things/${thing._id}`).subscribe((err: any) => {
      if (err) {
        console.error(err);
      }
      this.fetchThings();
    });
  }
}
