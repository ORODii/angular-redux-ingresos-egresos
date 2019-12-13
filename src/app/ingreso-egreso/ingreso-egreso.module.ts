import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';
import { StoreModule } from '@ngrx/store';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';

import { OrdenIngresoEgresoPipe } from './orden-ingreso-egreso.pipe';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    DetalleComponent,
    EstadisticaComponent,
    IngresoEgresoComponent,
    OrdenIngresoEgresoPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    SharedModule,
    ChartsModule,
    StoreModule.forFeature('ingresoEgreso', ingresoEgresoReducer)
  ]
})
export class IngresoEgresoModule { }
