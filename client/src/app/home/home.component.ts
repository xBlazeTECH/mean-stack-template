import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public awesomeThings: any[] = [];
  public newThing: any = {};

  constructor(private http: HttpClient, private socket: Socket) {}

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.fetchThings();
  }

  fetchThings(): void {
    this.http.get('/api/things').subscribe((awesomeThings: any) => {
      this.awesomeThings = awesomeThings;
    });
  }

  addThing(): void {
    if (!this.newThing.name || this.newThing.name === '') return;
    this.http.post('/api/things', this.newThing).subscribe((err: any) => {
      if (err) console.log(err);
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
