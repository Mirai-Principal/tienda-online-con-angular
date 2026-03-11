import { Injectable, signal } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { log } from 'firebase/firestore/pipelines';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private _token = signal<string | null>(null); //inicializar el token
  readonly token = this._token.asReadonly();

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  login(email: string, password: string) {
    // console.log('email', email);
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
        console.error('❌ Error al iniciar sesion', error);
      });
  }

  //verificar si el usuario esta autenticado
  isAuthenticated() {
    return this.token() != null;
  }

  //logout
  logout() {
    const auth = this.firebaseService.auth;
    auth.signOut()
      .then(() => {
        this._token.set(null);  //borrar el token para cerrar sesion
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('❌ Error al cerrar sesion', error);
      });
  }

}
