import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from 'src/app/ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
  userSubscription: Subscription = new Subscription();
  user: User;

  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private ingresoEgresoService: IngresoEgresoService
  ) { }
  ngOnInit() {
    this.userSubscription = this.store
      .select('auth')
      .pipe(filter(auth => auth.user !== null))
      .subscribe(auth => this.user = auth.user)
    ;
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.ingresoEgresoService.cancelarSubscriptions();
  }
}
