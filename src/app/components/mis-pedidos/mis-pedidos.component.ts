import { Component, OnInit, Signal } from '@angular/core';
import { MisPedidosService } from '../../services/mis-pedidos.service';
import { ProductoPedido } from '../../interfaces/productoPedido';
import { getPedidos, getProductoId, getProductosPedido } from '../../BDManagement/APIResquests';
import { Producto } from '../../interfaces/producto';

@Component({
  selector: 'app-mis-pedidos',
  imports: [],
  templateUrl: './mis-pedidos.component.html',
  styleUrl: './mis-pedidos.component.css',
  standalone: true
})
export class MisPedidosComponent implements OnInit {

  private idUsuarioLogIn: Number = 0;

  listaPedidos: ProductoPedido[] = [];

  constructor(private pedidoService: MisPedidosService) {
    //this.listaPedidos = this.pedidoService.pedidos;
  }

  async ngOnInit() {

    this.idUsuarioLogIn = Number(sessionStorage.getItem("idUsuario") || 0);
    //this.pedidoService.loadPedidos();
    const listaPedidos = await getPedidos(this.idUsuarioLogIn);

    console.log("idUsuarioLogin: ", this.idUsuarioLogIn);

    console.log("listaPedidos", listaPedidos);

    for (let i = 0; i < listaPedidos.length; i++) {
      const element = listaPedidos[i];

      const listaProductosPedido = await getProductosPedido(element.id);

      console.log("listaProductosPedido: ", listaProductosPedido);

      const listaProductos: Producto[] = [];

      for (let i = 0; i < listaProductosPedido.length; i++) {
        const element = listaProductosPedido[i];


        console.log("element.idProducto: ", element.idProducto);
        let producto = await getProductoId(element.idProducto);

        console.log("producto", producto);

        listaProductos.push(producto);
      }
      
      const objetoPedido: ProductoPedido = {
        idPedido: element.id,
        idUsuario: element.idUsuario,
        listaProductos: listaProductos
      }


  

      this.listaPedidos.push(objetoPedido);
      
    }

    console.log("this.listaPedidos", this.listaPedidos);

    
    


  }
}
