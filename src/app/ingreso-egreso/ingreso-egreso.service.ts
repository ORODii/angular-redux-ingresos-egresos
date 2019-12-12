import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { AppState } from '../app.reducer';
import { SetItemsAction, UnsetItemsAction } from './ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {
  listenerSubscription: Subscription = new Subscription();
  itemsSuscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private angularFirestore: AngularFirestore,
    private authService: AuthService
  ) { }

  initIngresoEgresoListener() {
    this.listenerSubscription = this.store
      .select('auth')
      .pipe(filter(auth => auth.user !== null))
      .subscribe(auth => {
        this.ingresoEgresoItems(auth.user.uid);
      });
  }

  private ingresoEgresoItems(uid: string) {
    this.itemsSuscription = this.angularFirestore
      .collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(map(doc => {
        return doc.map(data => {
          return {
            uid: data.payload.doc.id,
            ... data.payload.doc.data()
          }
        })
      }))
      .subscribe((collection: any[]) => {
        this.store.dispatch(new SetItemsAction(collection));
      });
  }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const user = this.authService.getUser();

    return this.angularFirestore
      .doc(`${user.uid}/ingresos-egresos`)
      .collection('items')
      .add({ ... ingresoEgreso })
    ;
  }

  borrarIngresoEgreso(uid: string) {
    const user = this.authService.getUser();

    return this.angularFirestore
      .doc(`${user.uid}/ingresos-egresos/items/${uid}`)
      .delete()
    ;
  }

  cancelarSubscriptions() {
    this.listenerSubscription.unsubscribe();
    this.itemsSuscription.unsubscribe();

    this.store.dispatch(new UnsetItemsAction());
  }
}
