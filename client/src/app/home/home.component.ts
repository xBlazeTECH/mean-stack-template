import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @Input()
  awesomeThings: any[] = [];
  newThing: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('/api/things').subscribe((awesomeThings: any) => {
      this.awesomeThings = awesomeThings;
    });
  }

  addThing(): void {
    if (this.newThing === undefined) return;
  }

  deleteThing(thing: any): void {}
}
