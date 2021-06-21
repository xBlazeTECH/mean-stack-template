import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { LogService } from '../log.service';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public awesomeThings: any[] = [];
  public activeThing: any = {};
  public isEditing: boolean = false;

  constructor(private logger: LogService, private http: HttpClient, private socketService: SocketService, public auth: AuthenticationService) {}

  ngOnDestroy(): void {
    this.socketService.unsyncUpdates('things');
  }

  ngOnInit(): void {
    this.socketService.connected().subscribe(() => {
      this.http.get('/api/things').subscribe((awesomeThings: any) => {
        this.awesomeThings = awesomeThings;
        this.socketService.syncUpdates('thing', this.awesomeThings);
      })
    })
  }

  saveThing(): void {
    console.log('saveThing');
    if (!this.activeThing.name || this.activeThing.name === '') return;
    if (this.isEditing) {
      this.http.put(`/api/things/${this.activeThing._id}`, this.activeThing).subscribe((data: any) => {
        this.isEditing = false;
        this.activeThing = {};
      })
    } else {
      this.http.post('/api/things', this.activeThing).subscribe((data: any) => {
        this.activeThing = {};
      });
    }
  }

  editThing(thing: any): void {
    console.log('editThing');
    this.isEditing = true;
    this.activeThing = JSON.parse(JSON.stringify(thing));
  }

  deleteThing(thing: any): void {
    console.log('deleteThing');
    console.log(thing);
    this.http.delete(`/api/things/${thing._id}`).subscribe((data: any) => {});
  }
}
