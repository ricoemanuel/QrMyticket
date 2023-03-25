import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth,signInWithEmailAndPassword } from '@angular/fire/auth';
import { LoginService } from '../login.service';
import { MainComponent } from '../main/main.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  correo=""
  contrasena=""
  constructor(private router:Router,private loginservice:LoginService,private main:MainComponent){}
  async iniciar(){
    let email=this.correo
    let password=this.contrasena
    await this.loginservice.login({email,password})
    localStorage.setItem("login","true")
    window.location.reload()
  }
}
