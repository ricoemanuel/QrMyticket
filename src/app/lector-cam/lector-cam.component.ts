import { Component,ViewChild, ViewEncapsulation, OnInit,AfterViewInit } from '@angular/core';
import {QrScannerComponent} from 'angular2-qrscanner';
import { LectorService } from '../servicios/lector.service';

@Component({
  selector: 'app-lector-cam',
  templateUrl: './lector-cam.component.html',
  styleUrls: ['./lector-cam.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class LectorCamComponent {
  title='lectorqr';
  Qr="";
  DefQr=[];
  constructor(
    private lectorService:LectorService
  ){}
  enviarQR(){
    
    console.log(this.lectorService.getEntrada(this.Qr.split(",")[1]))
  }

  @ViewChild(QrScannerComponent, { static: false })
  qrScannerComponent!: QrScannerComponent;
 
  ngAfterViewInit(){
    this.qrScannerComponent.getMediaDevices().then(devices => {
      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of devices) {
          if (device.kind.toString() === 'videoinput') {
              videoDevices.push(device);
          }
      }
      if (videoDevices.length > 0){
          let choosenDev;
          for (const dev of videoDevices){
              if (dev.label.includes('front')){
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
      this.Qr=result
  });
  }
}
