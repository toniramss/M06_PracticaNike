import { Component, Input } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { CestaService } from '../../services/cesta.service';
import { deleteProducto, putUpdateProductoStock } from '../../BDManagement/APIResquests';
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
    stock: 0,
    oferta: false,
  };

  constructor(private cestaService: CestaService, private productService: ProductServiceService) {}

  async addToCart(producto: Producto) {
    console.log("Producto añadido al carrito");

    this.cestaService.agregarProductoACesta(producto);


    let response = await putUpdateProductoStock(producto.id, producto.stock -1);

    console.log("Response stock: ", response);

    //Actualizar lista de productos
    this.productService.loadProductos();  
    
    this.cestaService.pedidoRealizado = false;
    this.cestaService.restablecerStock(producto);


  }


  async eliminarProducto(id: number) {

    console.log("Eliminar producto");

    let response = await deleteProducto(id);

    console.log("Response: ", response);

    //this.productService.deleteProducto(id);

    this.productService.loadProductos();


  }
}
