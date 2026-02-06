import { Injectable, signal } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { log } from 'firebase/firestore/pipelines';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private _token = signal<string>('');
  readonly token = this._token.asReadonly();

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  login(email: string, password: string) {
    console.log('email', email);
    const auth = this.firebaseService.auth;
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        auth.currentUser?.getIdToken()
          .then((token) => {
            this._token.set(token);
            this.router.navigate(['/']);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('❌ Error al iniciar sesion', errorCode, errorMessage);
      });

  }

}
