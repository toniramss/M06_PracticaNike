import { Component, Signal, signal, NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Producto } from '../../interfaces/producto';
import { ProductServiceService } from '../../services/product-service.service';
import { CestaService } from '../../services/cesta.service';
import { postCreatePedido } from '../../BDManagement/APIResquests';
import { PostPedidosApi } from '../../interfaces/postPedidosApi';

@Component({
  selector: 'app-navbar-component',
  imports: [RouterLink],
  templateUrl: './navbar-component.component.html',
  styleUrl: './navbar-component.component.css'
})
export class NavbarComponentComponent {

  //TODO: al iniciar sesion guardar en sessionStorage
  //tipoUsuarioIniciado = 'n';
  tipoUsuarioIniciado = sessionStorage.getItem("tipoUsuario") || 'n';
  idUsuarioIniciado = Number(sessionStorage?.getItem("idUsuario")) || 1; //Number(sessionStorage.getItem("idUsuario"));

  mostrarDialogoCesta: Boolean = false;
  listaProductosCesta: Signal<Producto[]>;

  listaProductos: Signal<Producto[]>;  // La lista de productos obtenida del servicio
  searchTerm: string = '';  // La variable que se vincula con el input
  filteredProductos: Producto[] = [];  // Lista de productos filtrados

  constructor(private productService: ProductServiceService, private cestaService: CestaService) {
    this.listaProductos = this.productService.obtenerDatos();  // Obtener la lista de productos
    this.filteredProductos = this.listaProductos();  // Inicializar la lista filtrada con todos los productos
    this.listaProductosCesta = this.cestaService.obtenerProductosCesta();

    console.log("Lista productos cesta: ", this.listaProductosCesta());
  }

  // La función de búsqueda
  search() {
    // Filtramos los productos según el valor que el usuario ha escrito en searchTerm
    const searchTermLower = this.searchTerm.toLowerCase();  // Convertir a minúsculas para una búsqueda sin distinción de mayúsculas/minúsculas

    this.filteredProductos = this.listaProductos().filter(producto =>
      producto.nombre.toLowerCase().includes(searchTermLower)  // Filtrar por nombre
    );
  }

  showCart() {
    this.mostrarDialogoCesta = !this.mostrarDialogoCesta;

    console.log("Lista cesta: ", this.listaProductosCesta());
  }

  async tramitarPedido() {

    console.log("Tramitar pedido");

    let postPedidosApi: PostPedidosApi = {
      idUsuario: this.idUsuarioIniciado,
      productos: []
    }

    for (let i = 0; i < this.listaProductosCesta().length; i++) {
      const element = this.listaProductosCesta()[i];

      postPedidosApi.productos.push(element.id);
      
    }

    console.log("Pedido preparado para enviar: ", postPedidosApi);

    let response = await postCreatePedido(postPedidosApi);

    console.log("Response createPedido: ", response);

    this.cestaService.pedidoRealizado = true;

    this.cestaService.listaProductosCesta.set([]);  

  }


}
