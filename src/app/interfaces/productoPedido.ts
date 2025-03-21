import { Producto } from "./producto";

export interface ProductoPedido {
    idPedido: Number,
    idUsuario: Number,
    listaProductos: Producto[],
}