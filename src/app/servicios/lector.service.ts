import { Injectable } from '@angular/core';
import { collection, Firestore, addDoc,getDocs, collectionData, getDoc, doc, query, where,setDoc} from '@angular/fire/firestore';
import Entrada from '../interfaces/place.interface';

@Injectable({
  providedIn: 'root'
})
export class LectorService {

  constructor(private firestore:Firestore) { }

  addEntrada(entrada:Entrada){
    entrada.estado=true;
    const entradaRef=collection(this.firestore,"entradas")
    return addDoc(entradaRef,entrada)
  }
  getEntradas(){
    const entradaRef=collection(this.firestore,"entradas")
    return collectionData(entradaRef,{idField:'id'})
  }
  getEntrada(correo: any){
    const entradaRef=collection(this.firestore,`entradas`)
    return getDocs(query(entradaRef,where("correo","==",correo)))
    
  }
  editEntrada(entrada:any,id:string){
    const entradaRef=doc(this.firestore,"entradas",id)
    setDoc(entradaRef,entrada)
  }

}
