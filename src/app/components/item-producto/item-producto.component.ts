import { Component, Input } from '@angular/core';
import { Producto } from '../../interfaces/producto';

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
    imagenes: [],
    precio: 0,
    colores: [],
    tallas: [],
    modelo: "",
    oferta: false,
  };
}
