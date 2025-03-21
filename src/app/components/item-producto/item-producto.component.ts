import { Component, Input } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { CestaService } from '../../services/cesta.service';
import { deleteProducto } from '../../BDManagement/APIResquests';
import { ProductServiceService } from '../../services/product-service.service';

@Component({
  selector: 'app-item-producto',
  imports: [],
  templateUrl: './item-producto.component.html',
  styleUrl: './item-producto.component.css'
})
export class ItemProductoComponent {

  tipoUsuarioIniciado = sessionStorage.getItem("tipoUsuario");

  @Input() producto: Producto = {
    id: 0,
    nombre: "",
    tipoProducto: "",
    descripcion: "",
    imagenes: "",
    precio: 0,
    modelo: "",
    oferta: false,
  };

  constructor(private cestaService: CestaService, private productService: ProductServiceService) {}

  addToCart(producto: Producto) {
    console.log("Producto añadido al carrito");

    this.cestaService.agregarProductoACesta(producto);



  }


  async eliminarProducto(id: number) {

    console.log("Eliminar producto");

    let response = await deleteProducto(id);

    console.log("Response: ", response);

    //this.productService.deleteProducto(id);

    this.productService.loadProductos();


  }
}
