import { Component } from '@angular/core';
import { AuthenticationService, UserDetails } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  userDetails!: UserDetails;

  constructor(public auth: AuthenticationService) {}

  ngOnInit() {
    this.auth.profile().subscribe(
      (user) => {
        this.userDetails = user;
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
