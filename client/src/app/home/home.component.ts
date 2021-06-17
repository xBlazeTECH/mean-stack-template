import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { find } from 'rxjs/operators';
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
    this.http.get('/api/things').subscribe((awesomeThings: any) => {
      this.awesomeThings = awesomeThings;
      console.log(this.awesomeThings);
      this.socketService.connected().subscribe((thing: any) => {
        this.socketService.syncUpdates('thing', this.awesomeThings);
      });
    });
  }

  addThing(): void {
    if (!this.newThing.name || this.newThing.name === '') return;
    this.http.post('/api/things', this.newThing).subscribe((data: any) => {
      console.log(data);
      this.awesomeThings.push(data);
      this.newThing = {};
    });
  }

  deleteThing(thing: any): void {
    this.http.delete(`/api/things/${thing._id}`).subscribe((data: any) => {
      console.log(data);
    });
  }
}
