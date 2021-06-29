import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user.model';
import { environment } from 'src/environments/environment';

export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
}

@Injectable()
export class AuthenticationService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public login(username: string, password: string) {
    return this.http.post<User>(`/auth/local`, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }))
  }

  public logout() {
    localStorage.removeItem('user');
    this.userSubject.next(new User());
    this.router.navigate(['/account/login']);
  }

  public register(user: User) {
    return this.http.post(`/auth/register`, user);
  }

  public getAll() {
    return this.http.get<User[]>(`/api/users`);
  }

  public getById(id: string) {
    return this.http.get<User>(`/api/users/${id}`)
  }

  public update(id: string, params: any) {
    return this.http.put(`/api/users/${id}`, params)
      .pipe(map(x => {
        if (id == this.userValue.id) {
          const user = { ...this.userValue, ...params }
          localStorage.setItem('user', JSON.stringify(user));

          this.userSubject.next(user);
        }
      }))
  }

  public delete(id: string) {
    return this.http.delete(`/api/users/${id}`)
      .pipe(map(x => {
        // auto logout if the logged in user deleted their own record
        if (id == this.userValue.id) {
          this.logout();
        }
        return x;
      }))
  }

  // private saveToken(token: string): void {
  //   localStorage.setItem('mean-token', token);
  //   this.token = token;
  // }

  // private getToken(): string {
  //   if (!this.token) {
  //     this.token = localStorage.getItem('mean-token')!;
  //   }
  //   return this.token;
  // }

  // public getUserDetails(): UserDetails {
  //   const token = this.getToken();
  //   let payload;
  //   if (token) {
  //     payload = token.split('.')[1];
  //     payload = window.atob(payload);
  //     return JSON.parse(payload);
  //   } else {
  //     return null!;
  //   }
  // }

  // public isLoggedIn(): boolean {
  //   const user = this.getUserDetails();
  //   if (user) {
  //     return user.exp > Date.now() / 1000;
  //   } else {
  //     return false;
  //   }
  // }

  // private request(
  //   method: 'post' | 'get',
  //   type: 'login' | 'register' | 'profile' | 'local',
  //   user?: TokenPayload
  // ): Observable<any> {
  //   let base;
  //   if (method === 'post') {
  //     base = this.http.post(`/auth/${type}`, user);
  //   } else {
  //     base = this.http.get(`/auth/${type}`, {
  //       headers: { Authorization: `Bearer ${this.getToken()}` },
  //     });
  //   }

  //   const request = base.pipe(
  //     map((data: any) => {
  //       if (!data) return;
  //       if (data.token) {
  //         this.saveToken(data.token);
  //       }
  //       return data!;
  //     })
  //   );

  //   return request;
  // }

  // public register(user: TokenPayload): Observable<any> {
  //   return this.request('post', 'register', user);
  // }

  // public login(user: TokenPayload): Observable<any> {
  //   return this.request('post', 'local', user);
  // }

  // public profile(): Observable<any> {
  //   return this.request('get', 'profile');
  // }

  // public logout(): void {
  //   this.token = '';
  //   window.localStorage.removeItem('mean-token');
  //   this.router.navigateByUrl('/account/login');
  // }
}
