import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private angularAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private router: Router
  ) { }

  initAuthListener() {
    this.angularAuth.authState.subscribe((firebaseUser) => {

    });
  }

  isAuth() {
    return this.angularAuth.authState.pipe(map(fbUser => {
        if (fbUser === null) {
          this.logout();
        }

        return fbUser !== null;
    }));
  }

  signIn(nombre:string, email:string, password:string) {
    this.angularAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(resp => {
        const user: User = {
          uid: resp.user.uid,
          nombre: nombre,
          email: email
        }

        this.angularFirestore
          .doc(`${user.uid}/usuario`)
          .set(user)
          .then(() => this.router.navigate(['/']))
        ;
      })
      .catch(error => {
        Swal.fire('Error al registrarse', error.message, 'error');
      })
    ;
  }

  login(email: string, password: string) {
    this.angularAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.router.navigate(['/']);
      })
      .catch(error => {
        Swal.fire('Error al iniciar sesión', error.message, 'error');
      })
    ;
  }

  logout() {
    this.router.navigate(['/login']);
    this.angularAuth.auth.signOut();
  }
}
