import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginData: any = '';

  constructor(private authService: AuthService, private fb: FormBuilder
    , private router: Router) { }

  ngOnInit(): void {
    this.loginData = this.fb.group({
      password: ['']
    })
  }

  public login(): void {
    this.authService.login({ password: this.loginData.value.password })
      .subscribe({
        next: () => {
          this.authService.isAdmin.value ? this.router.navigate(['/dashboard']) : null;
        }
      });
  }

  public logout(): void {
    this.authService.logout();
  }
}
