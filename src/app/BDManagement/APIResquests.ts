import { Producto } from "../interfaces/producto";
import { Login } from "../interfaces/login";
import { Register } from "../interfaces/register";
import { PedidoApi } from "../interfaces/pedidosApi";
import { PostPedidosApi } from "../interfaces/postPedidosApi";
import { ProductoPedido } from "../interfaces/productoPedido";


const API_URL = "http://localhost:3000/";

export async function postLogin(login: Login) {
    try {
        const response = await fetch(
            API_URL + "auth", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
        }
        );

        if (!response.ok) {
            throw new Error('Error al iniciar sesión');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function postRegister(register: Register) {
    try {
        const response = await fetch(
            API_URL + "postCreateUser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(register)
        }
        );

        if (!response.ok) {
            throw new Error('Error al crear el usuario');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function getProductos() {

    let listProductos: Producto[] = [];

    const response = await fetch(API_URL + 'getProductos/');

    if (!response.ok) {
        throw new Error('Error al obtener los productos');
    }

    listProductos = await response.json();

    return listProductos;

}

export async function getProductoId(id: Number) {

    let producto: Producto = {
        id: 0,
        nombre: "",
        tipoProducto: "",
        descripcion: "",
        imagenes: "",
        precio: 0,
        modelo: "",
        oferta: false
    };

    const response = await fetch(API_URL + 'getProducto/' + id);

    if (!response.ok) {
        throw new Error('Error al obtener los productos');
    }

    producto = await response.json();

    return producto;

}

export async function postCreateProducto(producto: Producto) {

    try {
        const response = await fetch(
            API_URL + "postCreateProducto", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        }
        );

        if (!response.ok) {
            throw new Error('Error al crear el producto');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }

}

export async function putUpdateProducto(id: Number, producto: Producto) {

    try {
        const response = await fetch(
            API_URL + "modifyProducto/" + id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        }
        );

        if (!response.ok) {
            throw new Error('Error al actualizar el producto');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }

}

export async function putUpdateProductoStock(id: Number, newStock: Number) {

    try {
        const response = await fetch(
            API_URL + "modifyStockProducto/" + id + "/" + newStock, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            //body: JSON.stringify(producto)
        }
        );

        if (!response.ok) {
            throw new Error('Error al actualizar el stock del producto');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }

}

export async function deleteProducto(id: Number) {

    try {
        const response = await fetch(
            API_URL + "deleteProducto/" + id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            //body: JSON.stringify(producto)
        }
        );

        if (!response.ok) {
            throw new Error('Error al eliminar el producto');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }

}

export async function getPedidos(id: Number) {

    let listaPedidos: PedidoApi[] = [];

    console.log(API_URL + 'getPedidos/' + id);

    const response = await fetch(API_URL + 'getPedidos/' + id);

    if (!response.ok) {
        throw new Error('Error al obtener los pedidos');
    }

    listaPedidos = await response.json();

    return listaPedidos;

}

export async function getProductosPedido(idPedido: Number) {

    let listaProductosPedido = [];

    const response = await fetch(API_URL + 'getProductosPedido/' + idPedido);

    if (!response.ok) {
        throw new Error('Error al obtener los productos del pedido');
    }

    listaProductosPedido = await response.json();

    return listaProductosPedido;

}

export async function postCreatePedido(pedido: PostPedidosApi) {

    try {
        const response = await fetch(
            API_URL + "postCreatePedido", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedido)
        }
        );

        if (!response.ok) {
            throw new Error('Error al crear el pedido');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }

}

