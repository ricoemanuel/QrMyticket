import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioEntradaComponent } from './formulario-entrada/formulario-entrada.component';
import { LectorCamComponent } from './lector-cam/lector-cam.component';

const routes: Routes = [
  {path:'lector',component:LectorCamComponent},
  {path:'registro',component:FormularioEntradaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
