import { Component } from '@angular/core';
import { FormControl, FormGroup,FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { LectorService } from '../servicios/lector.service';

@Component({
  selector: 'app-formulario-entrada',
  templateUrl: './formulario-entrada.component.html',
  styleUrls: ['./formulario-entrada.component.css']
})
export class FormularioEntradaComponent {
  formulario:FormGroup;

  constructor(
    private lectorService:LectorService
  ){
    this.formulario=new FormGroup({
      correo:new FormControl(),
      codigoEvento:new FormControl(),
      codigoPersona:new FormControl(),
      
    })
  }
  async onSubmit(){
  /*
    const response=await this.lectorService.addEntrada(this.formulario.value)
    Swal.fire({
      icon: 'success',
      title: 'Entrada registrada',
      showConfirmButton: false,
      timer: 1500
    })*/
  }
}
