import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit {

  form: FormGroup;
  tipo = 'ingreso';

  constructor(private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'monto': new FormControl(1, [Validators.required, Validators.min(1)])
    });
  }

  crearIngresoEgreso() {
    const ingresoEgreso = new IngresoEgreso({
      ... this.form.value,
      tipo: this.tipo
    });

    this.ingresoEgresoService
      .crearIngresoEgreso(ingresoEgreso)
      .then((resp) => {
        Swal.fire('Creado', ingresoEgreso.descripcion, 'success');
        this.form.reset({
          monto: 1
        });
      })
      .catch(error => {
        Swal.fire('No fue posible guardar el Ingreso/Egreso', error.message, 'error');
      })
    ;
  }
}
