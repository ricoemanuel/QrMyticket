import { Component, ViewChild, ViewEncapsulation, OnInit, AfterViewInit, TemplateRef } from '@angular/core';
import { elementAt } from 'rxjs';
import Swal from 'sweetalert2';
import { LectorService } from '../servicios/lector.service';
import { NgxScannerQrcodeComponent, ScannerQRCodeResult, ScannerQRCodeConfig } from 'ngx-scanner-qrcode';
import { json } from 'stream/consumers';
import { LoginService } from '../login.service';
@Component({
  selector: 'app-lector-cam',
  templateUrl: './lector-cam.component.html',
  styleUrls: ['./lector-cam.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LectorCamComponent implements AfterViewInit {
  @ViewChild(NgxScannerQrcodeComponent, { static: false })
  qrScannerComponent!: NgxScannerQrcodeComponent;
  ingresados:any={}
  keys:string[]=[]
  respuesta: any;
  public config: ScannerQRCodeConfig = {
    // fps: 1000,
    constraints: {
      audio: false,
      video: {
        width: window.innerWidth,
      },
    },
    isBeep: false,
    // decode: 'macintosh',
    deviceActive: 0, // Camera 1 active


  };

  valor = ""
  public videoDevices: MediaDeviceInfo[] = [];
  boleta: string=""
  
  constructor(
    private lectorService: LectorService,
    private loginService: LoginService,
  ) { }
  async ngAfterViewInit() {
    this.qrScannerComponent.start()

    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        this.videoDevices = devices.filter(device => device.kind === 'videoinput');


      })
      .catch(error => {
        console.error('Error al obtener los dispositivos:', error);
      });
  }
async enviarQR(boleta: string) {
    this.respuesta = (await this.lectorService.getEntrada(boleta)).data()
    this.boleta=boleta
    console.log(this.respuesta)
    this.keys=Object.keys(this.respuesta.detalle)
    this.keys.forEach((key:string)=>{
      this.ingresados[key]={
        ninos:0,
        adultos:0
      }
    })
    
  }
  public onEvent(e: ScannerQRCodeResult[]): void {
    this.valor = this.qrScannerComponent.data.value[0].value
    this.qrScannerComponent.pause()
    this.validarFormato()
  }
  async validarFormato() {
    await this.enviarQR(this.valor)
  }
  async ingresar(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Validando entrada, por favor espere.',
      showConfirmButton: false,
    })
    if(this.respuesta.ingresados){
      this.keys.forEach(key=>{
        this.respuesta.ingresados[key].ninos+=this.ingresados[key].ninos
        this.respuesta.ingresados[key].adultos+=this.ingresados[key].adultos
      })
    }else{
      this.respuesta.ingresados=this.ingresados
    }
    let pass=true
    this.keys.forEach(key=>{
      if(this.respuesta.ingresados[key].ninos>this.respuesta.detalle[key].ninos){
        pass=false
      }
      if(this.respuesta.ingresados[key].adutlos>this.respuesta.detalle[key].adutlos){
        pass=false
      }
    })
    if(pass){
      console.log(this.respuesta)
      await this.lectorService.setFactura(this.respuesta,this.boleta)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Has ingresado las personas!!',
        showConfirmButton: false,
        timer: 3000
      }).then(()=>{
        window.location.reload()
      })
      
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Límite de personas sobrepasado',
        showConfirmButton: false,
        timer: 2000
      })
    }
  }
  cancelar(){
    window.location.reload()
  }
  
}
