import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';

import { User } from './user.model';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { SetUserAction, UnsetUserAction } from './auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubscription: Subscription;
  private user: User;

  constructor(
    private angularAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.userSubscription = new Subscription();
  }

  initAuthListener() {
    this.angularAuth.authState.subscribe((firebaseUser) => {
      if (firebaseUser) {
        this.userSubscription = this.angularFirestore.doc(`${firebaseUser.uid}/usuario`).valueChanges()
          .subscribe((userDb: any) => {
            const newUser = new User(userDb);
            this.store.dispatch(new SetUserAction(newUser));
            this.user = newUser;
          });
        } else {
          this.userSubscription.unsubscribe();
          this.user = null;
      }
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
    this.store.dispatch(new ActivarLoadingAction());

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
          .then(() => {
            this.router.navigate(['/']);
            this.store.dispatch(new DesactivarLoadingAction());
          })
        ;
      })
      .catch(error => {
        Swal.fire('Error al registrarse', error.message, 'error');
        this.store.dispatch(new DesactivarLoadingAction());
      })
    ;
  }

  login(email: string, password: string) {
    this.store.dispatch(new ActivarLoadingAction());

    this.angularAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.router.navigate(['/']);
        this.store.dispatch(new DesactivarLoadingAction());
      })
      .catch(error => {
        Swal.fire('Error al iniciar sesión', error.message, 'error');
        this.store.dispatch(new DesactivarLoadingAction());
      })
    ;
  }

  logout() {
    this.router.navigate(['/login']);
    this.angularAuth.auth.signOut();
    this.store.dispatch(new UnsetUserAction());
  }

  getUser() {
    return { ... this.user };
  }
}
