import { Injectable } from '@angular/core';
import { collection, Firestore, addDoc} from '@angular/fire/firestore';
import Entrada from '../interfaces/place.interface';

@Injectable({
  providedIn: 'root'
})
export class LectorService {

  constructor(private firestore:Firestore) { }

  addEntrada(entrada:Entrada){
    const entradaRef=collection(this.firestore,"entradas")
    return addDoc(entradaRef,entrada)
  }

}
