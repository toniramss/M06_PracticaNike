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

  anadirPrueba() {

    const productoEjemplo: Producto = {
      id: "12345",
      nombre: "Zapatillas Deportivas",
      tipoProducto: "Calzado",
      descripcion: "Zapatillas deportivas cómodas y ligeras, ideales para correr.",
      imagenes: [
          "http://172.17.23.21:3000/uploads/1740908182832.jpg"
      ],
      precio: 79.99,
      colores: ["Negro", "Blanco", "Azul"],
      tallas: ["38", "39", "40", "41", "42"],
      modelo: "RunnerX",
      oferta: true
  };

    this.listaProductos.update(listaProductos => [...listaProductos, productoEjemplo]);
  }

}
