import { Injectable } from '@angular/core';
import { Auth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { environment } from '../../environments';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  //reiniciar el servidor si no se carga la config

  // Your web app's Firebase configuration
  private readonly firebaseConfig = environment.firebaseConfig;

  public auth: Auth;
  public fireBase: Firestore;

  constructor() {
    const app = initializeApp(this.firebaseConfig);
    this.auth = getAuth(app);
    this.fireBase = getFirestore(app);
  }
}
