import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cad',
  templateUrl: './cad.component.html',
  styleUrls: ['./cad.component.css']
})
export class CadComponent implements OnInit {

  activeCalls!: any[];

  currentCall!: any;

  activeUnits!: any[];

  incidentTypes!: any[];

  newCallNote!: string;

  constructor() { }

  ngOnInit(): void {
    this.activeCalls = [{
      id: 427,
      type: "10-56 | Intoxicated Person",
      units: [],
      location: "Adam's Apple Boulevard",
      crossStreet: "None",
      premiseName: "None"
    }];
    this.activeUnits = [{
      id: 103,
      callsign: "102",
      name: "Paul King",
      status: "available"
    }]
    this.currentCall = this.activeCalls[0];
    this.incidentTypes = ["10-0 | Use Caution"]
  }

  clearCall(id: number): void {
    this.activeCalls.forEach(element => {
      if (element.id == id) this.activeCalls.splice(this.activeCalls.indexOf(element),1);
    });
  }

  callDetails(id: number): void {
    this.currentCall = this.activeCalls.find((value) => (value.id == id));
  }


}
