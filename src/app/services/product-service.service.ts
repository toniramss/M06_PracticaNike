import { Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto';
import { getProductos } from '../BDManagement/APIResquests';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private apiURL = "http://localhost:3000/";

  private listaProductos = signal<Producto[]>([]);


  constructor(private http: HttpClient) {}

  get productos(): Signal<Producto[]> {
    return this.listaProductos.asReadonly();
  }

  agregarDato(producto: Producto) {

    this.listaProductos.update(listaProductos => [...listaProductos, producto]);
    console.log("Producto agregado: ", this.listaProductos()[this.listaProductos().length - 1]);

    console.log("Lista de productos: ", this.obtenerDatos()());

    alert("Producto añadido con éxito");

  }

  obtenerDatos(): Signal<Producto[]> {

    return this.listaProductos;

  }

  loadProductos() {
    this.http.get<Producto[]>(this.apiURL + "getProductos").subscribe({
      next: (data) => this.listaProductos.set(data),
      error: (error) => console.error("Error al cargar productos: ", error),
    });
  }
  addProducto(producto: Producto) {
    this.http.post<Producto>(this.apiURL + "postCreateProducto", producto).subscribe({
      next: (newProducto) => this.listaProductos.update((productos) => [...productos, newProducto]),
      error: (error) => console.error("Error al añadir producto: ", error),
    })
  }
  deleteProducto(id: number) {
    this.http.delete<Producto>(`${this.apiURL}deleteProducto/${id}`).subscribe({
      next: () => {
        // Actualizar la lista de productos después de eliminar
        this.listaProductos.update((productos) => productos.filter((producto) => producto.id !== id));
        console.log("Producto eliminado con éxito");
  
        alert("Producto eliminado con éxito");
      },
      error: (error) => {
        console.error("Error al eliminar producto: ", error);
        alert("Error al eliminar producto");
      },
    });
  }

  restarStock() {
    

  }
  restablecerStock() {

  }



  /* anadirPrueba() {

    const productoEjemplo: Producto = {
      id: "12345",
      nombre: "Zapatillas Deportivas",
      tipoProducto: "Calzado",
      descripcion: "Zapatillas deportivas cómodas y ligeras, ideales para correr.",
      imagenes: "http://172.17.23.21:3000/uploads/1740908182832.jpg",
      precio: 79.99,
      colores: ["Negro", "Blanco", "Azul"],
      tallas: ["38", "39", "40", "41", "42"],
      modelo: "RunnerX",
      oferta: true
    };

    this.listaProductos.update(listaProductos => [...listaProductos, productoEjemplo]);
  }
   */
  /* async ngOnInit() {

    try {
      const productos = await getProductos();
      this.listaProductos.set(productos);
    } catch (error) {
      console.log("Error al obtener productos: ", error);
    }

  } */

}
