import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, TokenPayload } from '../../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: string | undefined = undefined;

  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router) { }

  login() {
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err.error);
      switch (err.error.message) {
        case 'Missing credentials':
          this.error = 'Please provide your username and password';
          break;
        case 'User not found':
        case 'Password is wrong':
          this.error = 'Username or Password is Incorrect';
          break;
        default:
          this.error = 'Unexpected Error Occured';
      }
    })
  }

  ngOnInit(): void {
  }

}
