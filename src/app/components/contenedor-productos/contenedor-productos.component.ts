import { Component, Signal } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { ItemProductoComponent } from '../item-producto/item-producto.component';

import { ProductServiceService } from '../../services/product-service.service';

@Component({
  selector: 'app-contenedor-productos',
  imports: [ItemProductoComponent],
  templateUrl: './contenedor-productos.component.html',
  styleUrl: './contenedor-productos.component.css'
})
export class ContenedorProductosComponent {

  listaProductos: Signal<Producto[]>;

  constructor(private productService: ProductServiceService) {
    this.listaProductos = this.productService.obtenerDatos();

    console.log("Lista de productos: ", this.listaProductos());
  }

  ngOnInit() {
    //this.listaProductos = this.productService.obtenerDatos();
  }

  //listaProductos = ProductServiceService.obtenerDatos();
  
}
