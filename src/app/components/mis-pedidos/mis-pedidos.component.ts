import { Component, OnInit, Signal } from '@angular/core';
import { MisPedidosService } from '../../services/mis-pedidos.service';
import { ProductoPedido } from '../../interfaces/productoPedido';
import { getPedidos, getProductosPedido } from '../../BDManagement/APIResquests';


@Component({
  selector: 'app-mis-pedidos',
  imports: [],
  templateUrl: './mis-pedidos.component.html',
  styleUrl: './mis-pedidos.component.css'
})
export class MisPedidosComponent implements OnInit {

  private idUsuarioLogIn: Number = 0;

  listaPedidos: ProductoPedido[] = [];

  constructor(private pedidoService: MisPedidosService) {
    //this.listaPedidos = this.pedidoService.pedidos;
  }

  async ngOnInit() {

    this.idUsuarioLogIn = Number(sessionStorage.getItem("idUsuario"));
    //this.pedidoService.loadPedidos();
    const listaPedidos = await getPedidos(this.idUsuarioLogIn);

    for (let i = 0; i < listaPedidos.length; i++) {
      const element = listaPedidos[i];

      const listaProductosPedido = await getProductosPedido(element.id);

      const listaProductos: Number[] = [];
      for (let i = 0; i < listaProductosPedido.length; i++) {
        const element = listaProductosPedido[i];
        listaProductos.push(element.idProducto);
      }
      
      const objetoPedido: ProductoPedido = {
        idPedido: element.id,
        idUsuario: element.idUsuario,
        listaProductos: listaProductos
      }

      this.listaPedidos.push(objetoPedido);
      
    }

    
    


  }
}
