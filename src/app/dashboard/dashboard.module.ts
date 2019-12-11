import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';
import { EstadisticaComponent } from '../ingreso-egreso/estadistica/estadistica.component';
import { DetalleComponent } from '../ingreso-egreso/detalle/detalle.component';


@NgModule({
  declarations: [
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
