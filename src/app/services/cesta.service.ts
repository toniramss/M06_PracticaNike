import { Injectable, Signal, signal } from '@angular/core';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class CestaService {

  listaProductosCesta = signal<Producto[]>([]);
  
  constructor() { }

  get productosCesta(): Signal<Producto[]> {
    return this.listaProductosCesta.asReadonly();
  }

  agregarProductoACesta(producto: Producto) {

    this.listaProductosCesta.update(listaProductosCesta => [...listaProductosCesta, producto]);
    console.log("Producto agregado a la cesta: ", this.listaProductosCesta()[this.listaProductosCesta().length - 1]);

    console.log("Lista de productos: ", this.obtenerProductosCesta()());

    alert("Producto añadido a la cesta");

  }

  obtenerProductosCesta(): Signal<Producto[]> {

    return this.listaProductosCesta;

  }



}
