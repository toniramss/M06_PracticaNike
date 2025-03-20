import { Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoPedido } from '../interfaces/productoPedido';
import { PedidoApi } from '../interfaces/pedidosApi';


@Injectable({
  providedIn: 'root'
})
export class MisPedidosService {

  private apiURL = "http://localhost:3000/";

  private listaPedidos = signal<ProductoPedido[]>([]);

  private listaPedidosApi: PedidoApi[] = [];
  private listaProductosPedido: ProductoPedido[] = [];

  private idUsuarioLogIn = sessionStorage.getItem("idUsuario");

  constructor(private http: HttpClient) { }

  get pedidos(): Signal<ProductoPedido[]> {

    for (let index = 0; index < this.listaPedidosApi.length; index++) {

      const element = this.listaPedidosApi[index];

      //const pedido: ProductoPedido = {

      //}

      console.log("Elemento: ", element);

      
    }



    return this.listaPedidos.asReadonly();
  }

  loadPedidos() {
    this.http.get<PedidoApi[]>(this.apiURL + "getPedidos/" + this.idUsuarioLogIn).subscribe({
      next: (data) => this.listaPedidosApi = data,
      error: (error) => console.error("Error al cargar pedidos: ", error),
    })
  }

  loadPedidosProductos(numeroPedido: Number) {
    this.http.get<ProductoPedido[]>(this.apiURL + "getProductosPedido" + numeroPedido).subscribe({
      next: (data) => this.listaProductosPedido = data,
      error: (error) => console.error("Error al cargar productos del pedido: ", error),
    })
  }

  
}
