import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'googleForms-ng';

  constructor(
    private authService: AuthService) {
    // this.authService.redirect();
  }

  ngOnInit(): void {
  }

}
