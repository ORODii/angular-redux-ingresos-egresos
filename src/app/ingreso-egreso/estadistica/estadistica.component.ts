import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Label, SingleDataSet } from 'ng2-charts';
import { IngresoEgresoState } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit, OnDestroy {
  ingresos: number;
  egresos: number;

  conteoIngresos: number;
  conteoEgresos: number;

  ingresosEgresosSubscription: Subscription = new Subscription();
  doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  doughnutChartData: SingleDataSet = [];

  constructor(private store: Store<IngresoEgresoState>) { }

  ngOnInit() {
    this.ingresosEgresosSubscription = this.store
      .select('ingresoEgreso')
      .subscribe(ingresoEgreso => this.contarIngresoEgreso(ingresoEgreso.items))
    ;
  }

  ngOnDestroy() {
    this.ingresosEgresosSubscription.unsubscribe();
  }

  contarIngresoEgreso(items: IngresoEgreso[]) {
    this.ingresos = 0;
    this.egresos = 0;
    this.conteoIngresos = 0;
    this.conteoEgresos = 0;

    items.forEach(item => {
      if (item.tipo === 'ingreso') {
        this.ingresos += item.monto;
        this.conteoIngresos++;
      } else {
        this.egresos += item.monto;
        this.conteoEgresos++;
      }
    });

    this.doughnutChartData = [this.ingresos, this.egresos];
  }
}
