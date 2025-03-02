import { Component, Signal, NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Producto } from '../../interfaces/producto';
import { ProductServiceService } from '../../services/product-service.service';

@Component({
  selector: 'app-navbar-component',
  imports: [RouterLink],
  templateUrl: './navbar-component.component.html',
  styleUrl: './navbar-component.component.css'
})
export class NavbarComponentComponent {

  listaProductos: Signal<Producto[]>;  // La lista de productos obtenida del servicio
  searchTerm: string = '';  // La variable que se vincula con el input
  filteredProductos: Producto[] = [];  // Lista de productos filtrados

  constructor(private productService: ProductServiceService) {
    this.listaProductos = this.productService.obtenerDatos();  // Obtener la lista de productos
    this.filteredProductos = this.listaProductos();  // Inicializar la lista filtrada con todos los productos
  }

  // La función de búsqueda
  search() {
    // Filtramos los productos según el valor que el usuario ha escrito en searchTerm
    const searchTermLower = this.searchTerm.toLowerCase();  // Convertir a minúsculas para una búsqueda sin distinción de mayúsculas/minúsculas

    this.filteredProductos = this.listaProductos().filter(producto =>
      producto.nombre.toLowerCase().includes(searchTermLower)  // Filtrar por nombre
    );
  }

}
