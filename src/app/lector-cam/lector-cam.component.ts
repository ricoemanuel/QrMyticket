import { Component, ViewChild, ViewEncapsulation, OnInit, AfterViewInit } from '@angular/core';
import { elementAt } from 'rxjs';
import Swal from 'sweetalert2';
import { LectorService } from '../servicios/lector.service';
import { NgxScannerQrcodeComponent,ScannerQRCodeDevice } from 'ngx-scanner-qrcode';
import { json } from 'stream/consumers';
import { LoginService } from '../login.service';
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
    private lectorService: LectorService,
    private loginService: LoginService
  ) { }
  async ngAfterViewInit(){
    this.iniciar()
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        this.videoDevices = devices.filter(device => device.kind === 'videoinput');
        
        if(this.videoDevices.length>1){
          this.cambiarCam()
        }
      })
      .catch(error => {
        console.error('Error al obtener los dispositivos:', error);
      });
  }
  /*
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
  */
  async enviarQR() {
    let usuario=await this.lectorService.getUsuarios(localStorage.getItem("user"))
    let datos=usuario.data()
    let perfil=""
    if(datos!=undefined){
      perfil=datos["nombre"]
    }
    this.valor=this.qrScannerComponent.data.value[0].value
    const respuesta=await this.lectorService.getEntrada(JSON.parse(this.valor).ticket_item_id)
    
    if(respuesta.size>0){
      respuesta.forEach(async entrada=>{
        let datos=entrada.data()
        if(datos["zona"]==perfil){
          if(datos["estado"]){
            datos["estado"]=false
            await this.lectorService.editEntrada(datos,entrada.id)
            Swal.fire({
              icon: 'success',
              title: `Bienvenid@, ${datos["nombre"]}`,
              showConfirmButton: false,
              timer: 1500
            })
          }else{
            Swal.fire({
              icon: 'error',
              title: `Esta entrada ya ha sido usada`,
              showConfirmButton: false,
              timer: 1500
            })
          }
        }else{
          Swal.fire({
            icon: 'error',
            title: `Usted no pertenece a esta zona`,
            showConfirmButton: false,
            timer: 3000})
        }
        
        
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: `Esta entrada no está registrada`,
        showConfirmButton: false,
        timer: 1500})
    }
    
  }
  iniciar(){
    this.qrScannerComponent.start()
  }
  cambiarCam(){
    
  }
  
}
