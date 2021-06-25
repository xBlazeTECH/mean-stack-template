import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cad',
  templateUrl: './cad.component.html',
  styleUrls: ['./cad.component.css'],
})
export class CadComponent implements OnInit {
  currentDispatcher: any = {
    callsign: 'C-103',
  };

  isLocationUpdated: boolean = false;

  newCallLocation!: string;

  activeCalls!: any[];

  currentCall!: any;

  updatedCall: any = {location: {street: '', numeric: ''}};

  activeUnits!: any[];

  streetNames: string[] = ['Abattoir Avenue','Abe Milton Parkway','Ace Jones Drive'];

  incidentTypes: any[] = [
    { code: '00', text: 'UNKNOWN SITUATION' }, // New Incident Type
    // { code: '00L', text: 'UNKNOWN LEO EMERGENCY' }, // New/Update Incident Type
    // { code: '00E', text: 'UNKNOWN EMS EMERGENCY' }, // New/Update Incident Type
    // { code: '00F', text: 'UNKNOWN FIRE EMERGENCY' }, // New/Update Incident Type
    { code: '10-1', text: 'TOW REQUESTED' }, // Update Incident Type
    { code: '10-10', text: 'CHECKS OK' }, // Update Incident Type
    { code: '10-13', text: 'ADDITIONAL UNIT NEEDED' }, // Update Incident Type
    { code: '10-15E', text: 'REQUESTING EMS' }, // New/Update Incident Type
    { code: '10-15F', text: 'REQUESTING FIRE' }, // New/Update Incident Type
    { code: '10-17', text: 'TRAFFIC DETAIL' }, // New Incident Type
    { code: '10-22', text: 'CANCEL CALL' }, // Update Incident Type
    { code: '10-36', text: 'TRAFFIC STOP' }, // New/Update Incident Type
    { code: '10-36F', text: 'FELONY TRAFFIC STOP' }, // New/Update Incident Type
    { code: '10-50', text: 'MVA W/ INJURIES' }, // New/Update Incident Type
    { code: '10-52', text: 'MVA PROP DAMAGE ONLY' }, // New/Update Incident Type
    { code: '10-55', text: 'IMPAIRED/INTOXICATED' }, // New/Update Incident Type
    { code: '10-62', text: 'SHOTS FIRED' }, // New/Update Incident Type
    { code: '10-70', text: 'SUSPICIOUS ACTIVITY' }, // New/Update Incident Type
    { code: '10-80', text: 'VEHICLE PURSUIT' }, // New/Update Incident Type
    { code: '10-80F', text: 'FOOT PURSUIT' }, // New/Update Incident Type
    { code: '10-99', text: 'OFFICER DOWN' }, // New/Update Incident Type
  ];

  tenCodes: any[] = [
    { code: '10-0', text: 'GAME CRASH' },
    { code: '10-1', text: 'REQUESTING TOW' },
    { code: '10-2', text: 'CEASE RADIO TRAFFIC' },
    { code: '10-3', text: 'CHANGE FREQUENCY' },
    { code: '10-4', text: 'ACKNOWLEDGED' },
    { code: '10-6', text: 'OFF-DUTY' },
    { code: '10-7', text: 'BUSY/UNAVAILABLE' },
    { code: '10-8', text: 'ON-DUTY/AVAILABLE' },
    { code: '10-9', text: 'REPEAT MESSAGE' },
    { code: '10-10', text: 'EVERYTHING IS CLEAR/OK' },
    { code: '10-12', text: 'STAND BY' },
    { code: '10-13', text: 'ADDITIONAL UNIT NEEDED' },
    { code: '10-15E', text: 'REQUESTING EMS' },
    { code: '10-15F', text: 'REQUESTING FIRE' },
    { code: '10-17', text: 'TRAFFIC DETAIL' },
    { code: '10-19', text: 'EN ROUTE' },
    { code: '10-20', text: 'LOCATION' },
    { code: '10-21', text: 'SUSPECT HAS WARRANT' },
    { code: '10-22', text: 'CANCEL CALL' },
    { code: '10-23', text: 'ON SCENE' },
    { code: '10-24', text: 'DISREGARD' },
    { code: '10-25', text: 'MEET IN GAME' },
    { code: '10-27', text: 'NAME CHECK' },
    { code: '10-28', text: 'PLATE CHECK' },
    { code: '10-36', text: 'TRAFFIC STOP' },
    { code: '10-36F', text: 'FELONY TRAFFIC STOP' },
    { code: '10-50', text: 'MOTOR VEHICLE ACCIDENT W/ INJURIES' },
    { code: '10-52', text: 'MOTOR VEHICLE ACCIDENT PROP DAMAGE' },
    { code: '10-55', text: 'IMPAIRED/INTOXICATED' },
    { code: '10-62', text: 'SHOTS FIRED' },
    { code: '10-70', text: 'SUSPICIOUS ACTIVITY' },
    { code: '10-80', text: 'VEHICLE PURSUIT' },
    { code: '10-80F', text: 'FOOT PURSUIT' },
    { code: '10-91', text: 'IMPROPER USE OF RADIO' },
    { code: '10-95', text: 'SUSPECT IN CUSTODY' },
    { code: '10-99', text: 'OFFICER DOWN' },
  ];

  newCallNote: string = "";

  constructor() {}

  ngOnInit(): void {
    this.activeCalls = [
      {
        id: 427,
        type: { code: '10-55', text: 'IMPAIRED/INTOXICATED' },
        units: [],
        location: { street: "Adam's Apple Boulevard", numeric: 1000 },
        crossStreet: 'None',
        premiseName: 'None',
        notes: '',
        updates: 0
      },
    ];
    this.activeUnits = [
      {
        id: 103,
        callsign: '102',
        name: 'Paul King',
        status: 'available',
      },
    ];
    this.currentCall = this.activeCalls[0];
    //this.newIncidentType = this.currentCall.type;
  }

  clearCall(id: number): void {
    this.activeCalls.forEach((element) => {
      if (element.id == id)
        this.activeCalls.splice(this.activeCalls.indexOf(element), 1);
    });
  }

  callDetails(id: number): void {
    this.currentCall = this.activeCalls.find((value) => value.id == id);
    this.updatedCall = JSON.parse(JSON.stringify(this.currentCall));
  }

  callTypeUpdated(event: any): void {
    this.currentCall.type.code = event;
    this.currentCall.type.text = this.getIncidentTypeText(event);
    this.addCallNote(`type updated to ${this.currentCall.type.text}`);
  }

  callLocationUpdated(event: any): void {
    this.isLocationUpdated = (this.currentCall.location.street !== this.updatedCall.location.street || this.currentCall.location.numeric !== this.updatedCall.location.numeric);
  }

  updateCallLocation(): void {
    this.addCallNote(`location updated to ${this.updatedCall.location.numeric} ${this.updatedCall.location.street}`);
    this.currentCall.location = JSON.parse(JSON.stringify(this.updatedCall.location));
    this.isLocationUpdated = false;
  }

  inputCallNote() {
    if (this.newCallNote == "") return;
    this.addCallNote(this.newCallNote);
    this.newCallNote = "";
  }

  addCallNote(message: string): void {
    let date: Date = new Date();

    let options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };
    this.currentCall.notes += `${date.toLocaleString('en-US', options)} | [${
      this.currentDispatcher.callsign
    }] ${message}\n`;
    this.currentCall.updates += 1;
  }

  getIncidentTypeText(code: string): string {
    return this.incidentTypes.find((val) => val.code == code).text;
  }
}
