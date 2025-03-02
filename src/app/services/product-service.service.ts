import { Injectable, Signal, signal } from '@angular/core';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  listaProductos =  signal<Producto[]>([]);

  //constructor() { }

  agregarDato(producto: Producto) {

    this.listaProductos.update(listaProductos => [...listaProductos, producto]);
    console.log("Producto agregado: ", this.listaProductos()[this.listaProductos().length - 1]);

    console.log("Lista de productos: ", this.obtenerDatos()());

    alert("Producto añadido con éxito");

  }

  obtenerDatos(): Signal<Producto[]> {

    return this.listaProductos;

  }

}
