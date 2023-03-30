import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { elementAt } from 'rxjs';
import Swal from 'sweetalert2';
import { LectorService } from '../servicios/lector.service';
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements AfterViewInit {
  general = 0
  vip = 0
  meet = 0
  total = 0
  boletas = 0
  generalGlobal:DocumentData[]=[]
  VipGlobal:DocumentData[]=[]
  MeetGlobal:DocumentData[]=[]
  constructor(private lector: LectorService) { }
  
  async ngAfterViewInit(): Promise<void> {
    let general = await this.lector.getGeneral()
    let arrayGeneral: DocumentData[]=[]
    general.forEach(element=>{
        arrayGeneral.push(element.data())
    })
    this.generalGlobal=arrayGeneral
    this.general = general.size
    let vip = await this.lector.getVip()
    let arrayVip: DocumentData[]=[]
    vip.forEach(element=>{
      arrayVip.push(element.data())
    })
    this.VipGlobal=arrayVip
    this.vip = vip.size
    let meet = await this.lector.getMeet()
    let arraMeet: DocumentData[]=[]
    meet.forEach(element=>{
      arraMeet.push(element.data())
    })
    this.MeetGlobal=arraMeet
    this.meet = meet.size
    this.total = this.general + this.meet + this.vip
    this.lector.getEntradas().subscribe(entradas => {
    this.boletas = entradas.length
    console.log(this.generalGlobal)
    console.log(this.VipGlobal)
    });
  }
  async legalizar() {
    let vip = 0
    let general = 0
    let entradasVip = await this.lector.getVip()
    entradasVip.forEach(element => {
      let datos = element.data()
      if (vip > 0) {
        vip = vip - 1
        datos["estado"] = true
        this.lector.editEntrada(datos, element.id)
      }
    })
      let entradasGeneral = await this.lector.getGeneral()
      entradasGeneral.forEach(element => {
        let datos = element.data()
        if (general > 0) {
          general = general - 1
          datos["estado"] = true
          this.lector.editEntrada(datos, element.id)
        }
      })
      Swal.fire({
        icon: 'success',
        title: `registrado`,
        
        
      })
    }
  GenerarExcel(){

    }

}
