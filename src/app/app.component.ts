import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JanelaViva';
  authService: AuthService;
  rotaAtual: string = "";


  constructor(authService: AuthService,
    private router: Router,
  ) {
    this.authService = authService;

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.rotaAtual = event.url
      }
      if (event instanceof NavigationEnd) {
        this.rotaAtual = event.url;
      }

      if (event instanceof NavigationError) {
        console.log(event.error);
      }
    });

  }





}
