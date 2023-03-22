import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioEntradaComponent } from './formulario-entrada/formulario-entrada.component';
import { LectorCamComponent } from './lector-cam/lector-cam.component';
import { LectorCSVComponent } from './lector-csv/lector-csv.component';
import { LectorbdComponent } from './lectorbd/lectorbd.component';

const routes: Routes = [
  {path:'lector',component:LectorCamComponent},
  {path:'registro',component:FormularioEntradaComponent},
  {path:'ingresocsv',component:LectorCSVComponent},
  {path:'entradas',component:LectorbdComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
