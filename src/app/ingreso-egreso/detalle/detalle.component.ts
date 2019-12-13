import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';
import { IngresoEgresoState } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresoEgresoSubscription: Subscription = new Subscription();
  items: IngresoEgreso[];

  constructor(
    private store: Store<IngresoEgresoState>,
    private ingresoEgresoService: IngresoEgresoService
    ) { }

  ngOnInit() {
    this.ingresoEgresoSubscription = this.store
      .select('ingresoEgreso')
      .subscribe(data => this.items = data.items)
    ;
  }

  ngOnDestroy() {
    this.ingresoEgresoSubscription.unsubscribe();
  }

  borrarItem(item: IngresoEgreso) {
    this.ingresoEgresoService
      .borrarIngresoEgreso(item.uid)
      .then(() => {
        Swal.fire('Se eliminó correctamente', item.descripcion);
      })
      .catch(error => {
        Swal.fire('Error al borrar', error.message, 'error');
      })
  }
}
