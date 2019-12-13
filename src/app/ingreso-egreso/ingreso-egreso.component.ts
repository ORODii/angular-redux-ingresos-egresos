import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { IngresoEgresoState } from './ingreso-egreso.reducer';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  form: FormGroup;
  tipo = 'ingreso';

  loadingSubscription: Subscription = new Subscription();
  cargando: boolean;

  constructor(
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<IngresoEgresoState>
  ) { }


  ngOnInit() {
    this.loadingSubscription = this.store
      .select('ui')
      .subscribe(ui => this.cargando = ui.isLoading)
    ;

    this.form = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'monto': new FormControl(1, [Validators.required, Validators.min(1)])
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

  crearIngresoEgreso() {
    const ingresoEgreso = new IngresoEgreso({
      ... this.form.value,
      tipo: this.tipo
    });

    this.store.dispatch(new ActivarLoadingAction());

    this.ingresoEgresoService
      .crearIngresoEgreso(ingresoEgreso)
      .then((resp) => {
        Swal.fire('Creado', ingresoEgreso.descripcion, 'success');
        this.form.reset({ monto: 1 });
        this.store.dispatch(new DesactivarLoadingAction());
      })
      .catch(error => {
        Swal.fire('No fue posible guardar el Ingreso/Egreso', error.message, 'error');
        this.store.dispatch(new DesactivarLoadingAction());
      })
    ;
  }
}
