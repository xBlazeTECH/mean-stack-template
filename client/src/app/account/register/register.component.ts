import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, TokenPayload } from '../../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  error: string | undefined = undefined;

  passConf!: string;

  credentials: TokenPayload = {
    email: '',
    name: '',
    password: '',
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  register() {
    if (this.credentials.password === this.passConf) {
      this.auth.register(this.credentials).subscribe(
        () => {
          this.router.navigateByUrl('/profile');
        },
        (err) => {
          console.log(err);
          switch (err.error.message) {
            case 'All fields required':
              this.error = 'Please fill out all required fields';
              break;
            case 'User already exists':
              this.error = 'A user with this email already exists';
              break;
            default:
              this.error = 'Unexpected Error Occured';
          }
        }
      );
    } else {
      this.error = 'Password and confirmation do not match';
    }
  }
  ngOnInit(): void {}
}
