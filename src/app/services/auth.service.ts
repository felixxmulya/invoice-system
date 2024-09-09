import { inject, Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public router: Router, public firebaseAuth: Auth) {}
  public errorMessage: string | null = null
  public user: string | null = null

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(() => {
        this.router.navigate(['/dashboard']);
        this.errorMessage = null;
      })
      .catch((error) => {
        if (error.code === 'auth/wrong-password') {
          this.errorMessage = 'Incorrect password. Please try again.';
        } else if (error.code === 'auth/user-not-found') {
          this.errorMessage = 'User not found. Please check your email and try again.';
        } else {
          this.errorMessage = 'Incorrect. Please try again.';
        }
      })
  }

  isLoggedIn(): boolean {
    return !!this.firebaseAuth.currentUser;
  }

  authentication() {
    onAuthStateChanged(this.firebaseAuth, user => {
      if (user) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
