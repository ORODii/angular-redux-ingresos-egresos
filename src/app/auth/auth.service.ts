import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularAuth: AngularFireAuth, private router: Router) { }

  crearUsuario(nombre:string, email:string, password:string) {
    this
      .angularAuth
      .auth.createUserWithEmailAndPassword(email, password)
      .then(user => this.router.navigate(['/']))
      .catch(error => console.log(error))
      ;
  }
}
