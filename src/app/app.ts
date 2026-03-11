import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from "@angular/router";
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(private loginService: LoginService, private router: Router) { }

  protected readonly title = signal('Tienda online');

  isAuthenticated() {
    return this.loginService.isAuthenticated();
  }

  logout() {
    this.loginService.logout();
  }

  //obtener la ruta actual
  getRoute() {
    return this.router.url;
  }
}
