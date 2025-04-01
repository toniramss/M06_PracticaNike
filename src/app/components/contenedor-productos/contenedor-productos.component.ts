import { Component, OnInit, Signal } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { ItemProductoComponent } from '../item-producto/item-producto.component';
import { CommonModule } from '@angular/common';
import { ProductServiceService } from '../../services/product-service.service';

@Component({
  selector: 'app-contenedor-productos',
  standalone: true,
  imports: [ItemProductoComponent, CommonModule],
  templateUrl: './contenedor-productos.component.html',
  styleUrl: './contenedor-productos.component.css'
})
export class ContenedorProductosComponent implements OnInit {

  listaProductos: Signal<Producto[]>;

  constructor(private productService: ProductServiceService) {
    this.listaProductos = this.productService.productos;

    //console.log("Lista de productos: ", this.listaProductos());
  }

  ngOnInit() {
    this.productService.loadProductos();

    console.log("Lista productos: ", this.listaProductos());
  }

  //listaProductos = ProductServiceService.obtenerDatos();
  
}
