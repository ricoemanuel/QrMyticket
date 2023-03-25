import { Component, ViewChild, ViewEncapsulation, OnInit, AfterViewInit } from '@angular/core';
import { elementAt } from 'rxjs';
import Swal from 'sweetalert2';
import { LectorService } from '../servicios/lector.service';
import { NgxScannerQrcodeComponent,ScannerQRCodeDevice } from 'ngx-scanner-qrcode';
@Component({
  selector: 'app-lector-cam',
  templateUrl: './lector-cam.component.html',
  styleUrls: ['./lector-cam.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LectorCamComponent implements AfterViewInit{
  @ViewChild(NgxScannerQrcodeComponent, { static: false })
  qrScannerComponent!: NgxScannerQrcodeComponent;
  
  title = 'lectorqr';
  
  valor=""
  public videoDevices: MediaDeviceInfo[] = [];
  constructor(
    private lectorService: LectorService
  ) { }
  async ngAfterViewInit(){
    this.iniciar()
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        this.videoDevices = devices.filter(device => device.kind === 'videoinput');
        console.log(this.qrScannerComponent.constraints)
        if(this.videoDevices.length>1){
          this.cambiarCam()
        }
      })
      .catch(error => {
        console.error('Error al obtener los dispositivos:', error);
      });
  }
  
  async enviarQR() {
    try {
      this.valor=this.qrScannerComponent.data.value[0].value
      console.log(this.valor.split(",")[2])
      let registro = await this.lectorService.getEntrada(this.valor.split(",")[2])
      
      if (registro.size == 1) {
        registro.forEach(element => {
          let id = element.id
          let data = element.data()
          if (data["estado"]) {
            data["estado"] = false
            this.lectorService.editEntrada(data, id)
            Swal.fire({
              icon: 'success',
              title: 'Puede seguir',
              showConfirmButton: false,
              timer: 1500
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'No puede seguir, boleta usada',
              showConfirmButton: false,
              timer: 1500
            })
          }

        })
      } else if (registro.size > 1) {
        let entrada = true

        registro.forEach(element => {
          if (entrada) {
            let id = element.id
            let data = element.data()
            if (data["estado"]) {
              data["estado"] = false
              this.lectorService.editEntrada(data, id)
              Swal.fire({
                icon: 'success',
                title: 'Puede seguir',
                showConfirmButton: false,
                timer: 1500
              })
              entrada = false
            }
          }

        })
        if (entrada) {
          Swal.fire({
            icon: 'error',
            title: 'No puede seguir, boleta usada',
            showConfirmButton: false,
            timer: 1500
          })
        }

      } else {
        Swal.fire({
          icon: 'error',
          title: 'No puede seguir, boleta usada',
          showConfirmButton: false,
          timer: 1500
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error, este QR no esta en la base de datos',
        showConfirmButton: false,
        timer: 3000
      })
    }


  }
  
  
  iniciar(){
    this.qrScannerComponent.start()
  }
  cambiarCam(){
    
  }
  
}
