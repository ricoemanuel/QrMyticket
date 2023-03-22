import { Component,OnInit } from '@angular/core';
import { LectorService } from '../servicios/lector.service';

@Component({
  selector: 'app-lectorbd',
  templateUrl: './lectorbd.component.html',
  styleUrls: ['./lectorbd.component.css']
})
export class LectorbdComponent implements OnInit {
  consultas:any;
  constructor(
    private lectorService:LectorService
  ){

  }
  ngOnInit() {
    this.lectorService.getEntradas().subscribe(entradas=>{
        this.consultas=entradas
    });
    
  }
  editar(consulta: any){
    console.log(consulta)
  }

}
