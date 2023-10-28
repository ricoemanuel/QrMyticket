import { Injectable } from '@angular/core';
import { collection, Firestore, addDoc,getDocs, collectionData, getDoc, doc, query, where,setDoc} from '@angular/fire/firestore';
import Entrada from '../interfaces/place.interface';

@Injectable({
  providedIn: 'root'
})
export class LectorService {

  constructor(private firestore:Firestore) { }

  addEntrada(entrada:any,id:string){
    entrada.estado=true;
    const entradaRef=doc(this.firestore,"entradas",id)
    return setDoc(entradaRef,entrada)
  }
  setFactura(entrada:any,id:string){
    entrada.estado=true;
    const entradaRef=doc(this.firestore,"facturas",id)
    return setDoc(entradaRef,entrada)
  }
  getEntradas(){
    const entradaRef=collection(this.firestore,"entradas")
    return collectionData(entradaRef,{idField:'id'})
  }
  getEntrada(ticket: any){
    const entradaRef=doc(this.firestore,"facturas",ticket)
    return getDoc(entradaRef)
    
  }
  editEntrada(entrada:any,id:string){
    const entradaRef=doc(this.firestore,"entradas",id)
    setDoc(entradaRef,entrada)
  }
  getUsuarios(id:any){
    const usuarioRef=doc(this.firestore,"usuarios",id)
    return getDoc(usuarioRef)
  }
  getGeneral(){
    const entradaRef=collection(this.firestore,`entradas`)
    return getDocs(query(entradaRef,where("zona","==","general"),where("estado","==",false)))
  }
  getVip(){
    const entradaRef=collection(this.firestore,`entradas`)
    return getDocs(query(entradaRef,where("zona","==","vip"),where("estado","==",false)))
  }
  getMeet(){
    const entradaRef=collection(this.firestore,`entradas`)
    return getDocs(query(entradaRef,where("zona","==","meet"),where("estado","==",false)))
  }
  getEntradasTrueVip(){
    const entradaRef=collection(this.firestore,`entradas`)
    return getDocs(query(entradaRef,where("zona","==","vip"),where("estado","==",true)))
  }
  getEntradasTrueGeneral(){
    const entradaRef=collection(this.firestore,`entradas`)
    return getDocs(query(entradaRef,where("zona","==","general"),where("estado","==",true)))
  }
}
