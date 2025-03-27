import { Injectable, Signal, signal } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { putUpdateProductoStock } from '../BDManagement/APIResquests';

@Injectable({
  providedIn: 'root'
})
export class CestaService {

  listaProductosCesta = signal<Producto[]>([]);
  pedidoRealizado = false;

  constructor() { }

  get productosCesta(): Signal<Producto[]> {
    return this.listaProductosCesta.asReadonly();
  }

  agregarProductoACesta(producto: Producto) {

    this.listaProductosCesta.update(listaProductosCesta => [...listaProductosCesta, producto]);
    console.log("Producto agregado a la cesta: ", this.listaProductosCesta()[this.listaProductosCesta().length - 1]);

    console.log("Lista de productos cesta service: ", this.obtenerProductosCesta()());

    alert("Producto añadido a la cesta");

  }



  obtenerProductosCesta(): Signal<Producto[]> {

    return this.listaProductosCesta;

  }

  async restablecerStock(producto: Producto) {

    console.log("Empieza la cuenta atrás de 10 minutos");

    setTimeout(async () => {
      if (!this.pedidoRealizado) {
        let response = await putUpdateProductoStock(producto.id, producto.stock);
        console.log("Stock restablecido después de 10 minutos: ", response);

        //Vaciar array productos cesta
        this.listaProductosCesta.set([]);      
      }
    }, 10 * 60 * 1000);

  }



}
