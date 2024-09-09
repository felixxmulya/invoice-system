import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.authentication();
  }

  login() {
    this.authService.login(this.email, this.password);
    if (this.authService.errorMessage) {
      this.password = '';
    }
  }

  get errorMessage(): string | null {
    return this.authService.errorMessage;
  }

}
