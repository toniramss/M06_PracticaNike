import { Component, Signal, signal, NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Producto } from '../../interfaces/producto';
import { ProductServiceService } from '../../services/product-service.service';
import { CestaService } from '../../services/cesta.service';

@Component({
  selector: 'app-navbar-component',
  imports: [RouterLink],
  templateUrl: './navbar-component.component.html',
  styleUrl: './navbar-component.component.css'
})
export class NavbarComponentComponent {

  aparecerAdmin: Boolean = false;
  mostrarDialogoCesta: Boolean = false;
  listaProductosCesta: Signal<Producto[]>;

  listaProductos: Signal<Producto[]>;  // La lista de productos obtenida del servicio
  searchTerm: string = '';  // La variable que se vincula con el input
  filteredProductos: Producto[] = [];  // Lista de productos filtrados

  constructor(private productService: ProductServiceService, private cestaService: CestaService) {
    this.listaProductos = this.productService.obtenerDatos();  // Obtener la lista de productos
    this.filteredProductos = this.listaProductos();  // Inicializar la lista filtrada con todos los productos
    this.listaProductosCesta = this.cestaService.productosCesta;
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
  }

  ngOnInit() {
    this.aparecerAdmin = sessionStorage.getItem("user") === "a"; 
  }

}
