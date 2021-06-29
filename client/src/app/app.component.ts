import { Component } from '@angular/core';
import { AuthenticationService, UserDetails } from './services/auth/authentication.service';
import { User } from './_models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  user!: User;

  constructor(public authenticationService: AuthenticationService) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  ngOnInit() {

  }

  logout() {
    this.authenticationService.logout();
  }
}
