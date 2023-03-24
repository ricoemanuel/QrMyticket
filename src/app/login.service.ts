import { Injectable } from '@angular/core';
import { Auth,signInWithEmailAndPassword,signOut } from '@angular/fire/auth';
import { getAuth } from "firebase/auth";
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  authf=getAuth()
  constructor(private auth:Auth) { }
  login(objeto:any){
    let email=objeto["email"]
    let password=objeto["password"]
    return signInWithEmailAndPassword(this.auth,email,password)
  }
  userObserver(){
    let usuario=this.authf.currentUser
    return usuario
  }
  cerrarSesion(){
    return signOut(this.auth)
  }
}
