import { Component, ViewChild, ViewEncapsulation, OnInit, AfterViewInit } from '@angular/core';
import { QrScannerComponent } from 'angular2-qrscanner';
import { elementAt } from 'rxjs';
import Swal from 'sweetalert2';
import { LectorService } from '../servicios/lector.service';

@Component({
  selector: 'app-lector-cam',
  templateUrl: './lector-cam.component.html',
  styleUrls: ['./lector-cam.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LectorCamComponent {
  title = 'lectorqr';
  Qr = "";

  constructor(
    private lectorService: LectorService
  ) { }
  async enviarQR() {
    try {
      let registro = await this.lectorService.getEntrada(this.Qr.split(",")[2])
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
              title: 'No puede seguir',
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
            title: 'No puede seguir',
            showConfirmButton: false,
            timer: 1500
          })
        }

      } else {
        Swal.fire({
          icon: 'error',
          title: 'No puede seguir',
          showConfirmButton: false,
          timer: 1500
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error, no puede seguir',
        showConfirmButton: false,
        timer: 3000
      })
    }


  }

  @ViewChild(QrScannerComponent, { static: false })
  qrScannerComponent!: QrScannerComponent;

  ngAfterViewInit() {
    this.qrScannerComponent.getMediaDevices().then(devices => {
      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of devices) {
        if (device.kind.toString() === 'videoinput') {
          videoDevices.push(device);
        }
      }
      if (videoDevices.length > 0) {
        let choosenDev;
        for (const dev of videoDevices) {
          if (dev.label.includes('front')) {
            choosenDev = dev;
            break;
          }
        }
        if (choosenDev) {
          this.qrScannerComponent.chooseCamera.next(choosenDev);
        } else {
          this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
        }
      }
    });

    this.qrScannerComponent.capturedQr.subscribe(result => {
      this.Qr = result
    });
  }
}
