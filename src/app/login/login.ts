import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(private loginService: LoginService) { }

  login(form: NgForm) {
    if (form.invalid) return;
    const { email, password } = form.value;
    this.loginService.login(email, password);
  }
}
