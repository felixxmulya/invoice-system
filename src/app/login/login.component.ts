import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


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
  errorMessage: string = '';

  constructor(private router: Router) {}

  login() {
    const auth = getAuth();  // Ensure Firebase is initialized
    if (this.email && this.password) {
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          console.log('User logged in:', userCredential);
          this.router.navigate(['/dashboard']);  // Redirect to dashboard
        })
        .catch((error) => {
          this.errorMessage = error.message;  // Display error message on login failure
        });
    } else {
      this.errorMessage = 'Please enter both email and password';
    }
  }
}
