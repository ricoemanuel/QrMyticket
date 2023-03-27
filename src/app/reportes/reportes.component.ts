import { AfterViewInit, Component } from '@angular/core';
import { LectorService } from '../servicios/lector.service';
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements AfterViewInit{
  general=0
  vip=0
  meet=0
  total=0
  boletas=0
  constructor(private lector:LectorService){}
  async ngAfterViewInit(): Promise<void> {
    let general=await this.lector.getGeneral()
    this.general=general.size
    let vip=await this.lector.getVip()
    this.vip=vip.size
    let meet=await this.lector.getMeet()
    this.meet=meet.size
    this.total=this.general+this.meet+this.vip
    this.lector.getEntradas().subscribe(entradas=>{
      this.boletas=entradas.length
  });
  }

}
