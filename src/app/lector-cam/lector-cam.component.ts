import { Component, ViewChild, ViewEncapsulation, OnInit, AfterViewInit } from '@angular/core';
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
  constructor(
    private lectorService: LectorService,
    private loginService: LoginService
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
    let usuario = await this.lectorService.getUsuarios(localStorage.getItem("user"))
    let datos = usuario.data()
    let perfil = ""
    let superU = false
    if (datos != undefined) {
      perfil = datos["nombre"]
      if (perfil == "emanuel") {
        superU = true
      }
    }
    const respuesta = await this.lectorService.getEntrada(boleta)
    if (respuesta.size > 0) {
      respuesta.forEach(async entrada => {
        let datos = entrada.data()
        if (datos["zona"] == perfil || superU) {
          if (datos["estado"]) {
            datos["estado"] = false
            Swal.fire({
              title: 'Desea pasar a la persona?',
              html: `
              Nombre: ${datos["nombre"]}
              <br><br>
              Zona: ${datos["zona"]}`,
              showDenyButton: true,
              showCancelButton: false,
              confirmButtonText: 'pasar',
              denyButtonText: `Cancelar`,
              
            }).then(async (result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                await this.lectorService.editEntrada(datos, entrada.id)
                Swal.fire('Bienvenid@', '', 'success')
              } else if (result.isDenied) {
                Swal.close()
              }
            })



          } else {
            Swal.fire({
              icon: 'error',
              title: `Esta entrada ya ha sido usada`,
              
            })
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: `Usted no pertenece a esta zona`,
            
          })
        }


      })
    } else {
      Swal.fire({
        icon: 'error',
        title: `Esta entrada no está registrada`,
        
      })
    }

  }
  public onEvent(e: ScannerQRCodeResult[]): void {
    this.valor = this.qrScannerComponent.data.value[0].value
    this.qrScannerComponent.pause()
    this.validarFormato()
  }
  async validarFormato() {
    Swal.fire({
      title: 'Validando entrada...',
      showConfirmButton: false,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      },

    })
    if (this.valor[0].toString() == "/") {
      await this.enviarQR(this.valor.split("/")[2])

    }
    else if (this.valor[0].toString() == "{") {
      await this.enviarQR(JSON.parse(this.valor).ticket_item_id)


    } else if (this.valor.split(",").length == 3) {
      await this.enviarQR(this.valor.split(",")[0]) 

    } else {
      Swal.fire({
        icon: 'error',
        title: `Este formato no existe...`,
        showConfirmButton: false,
        timer: 3000,
        didOpen: () => {
          Swal.hideLoading()
        }
      })

    }
    this.valor = ""
    this.qrScannerComponent.play()
  }
}
