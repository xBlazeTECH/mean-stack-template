import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  public log(msg: any) {
    console.log(new Date() + ": " + JSON.stringify(msg));
  }

  public error(msg: any) {
    console.error(new Date() + ": " + JSON.stringify(msg));
  }
}
