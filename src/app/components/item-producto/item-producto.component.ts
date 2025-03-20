import { Component, Input } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { CestaService } from '../../services/cesta.service';

@Component({
  selector: 'app-item-producto',
  imports: [],
  templateUrl: './item-producto.component.html',
  styleUrl: './item-producto.component.css'
})
export class ItemProductoComponent {
  @Input() producto: Producto = {
    id: "0",
    nombre: "",
    tipoProducto: "",
    descripcion: "",
    imagenes: "",
    precio: 0,
    colores: [],
    tallas: [],
    modelo: "",
    oferta: false,
  };

  constructor(private cestaService: CestaService) {}

  addToCart(producto: Producto) {
    console.log("Producto añadido al carrito");

    this.cestaService.agregarProductoACesta(producto);



  }
}
