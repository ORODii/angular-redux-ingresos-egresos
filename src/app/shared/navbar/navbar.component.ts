import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {
  userSubscription: Subscription = new Subscription();
  nombre: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.userSubscription = this.store
      .select('auth')
      .pipe(filter(auth => auth.user !== null))
      .subscribe(auth => this.nombre = auth.user.nombre)
    ;
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
