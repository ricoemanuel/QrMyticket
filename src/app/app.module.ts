import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgQrScannerModule } from 'angular2-qrscanner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FormularioEntradaComponent } from './formulario-entrada/formulario-entrada.component';
import { MenuHorizontalComponent } from './menu-horizontal/menu-horizontal.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LectorCamComponent } from './lector-cam/lector-cam.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LectorCSVComponent } from './lector-csv/lector-csv.component';
import { LectorbdComponent } from './lectorbd/lectorbd.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';


@NgModule({
  declarations: [
    AppComponent,
    FormularioEntradaComponent,
    MenuHorizontalComponent,
    LectorCamComponent,
    LectorCSVComponent,
    LectorbdComponent,
    LoginComponent,
    MainComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    NgQrScannerModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    ReactiveFormsModule,
    NgxScannerQrcodeModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
