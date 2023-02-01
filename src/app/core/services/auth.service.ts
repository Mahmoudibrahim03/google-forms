import { AuthModel } from '../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { tap, Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AuthModel {
  public LOGIN_END_POINT: string = `${this.BASE_URL}users`;
  public isAdmin: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private route: Router
  ) {
    super();
  };

  // user login
  login(body: { password: string; })
    : Observable<{ password: string }> {
    // change is logged in and add it to local storage
    return this.http.get(this.LOGIN_END_POINT).pipe(
      tap((res: any) => {
        if (body.password === res.password) {
          this.isAdmin.next(true)
          localStorage.setItem('isLogged', 'true');
        } else {
          this.isAdmin.next(false);
        }
      })
    )
  }

  logout(): void {
    localStorage.removeItem('isLogged');
    this.isAdmin.next(false);
  }

  redirect(): void {
    this.isAdmin.next(localStorage.getItem('isLogged') === 'true');
    if (this.isAdmin.value) {
      this.route.navigate(['/dashboard']);
    } else {
      this.route.navigate(['/auth/login']);
    }
  }

}
