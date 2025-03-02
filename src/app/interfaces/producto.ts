export interface Producto {
    id: string;
    nombre: string;
    tipoProducto: string;
    descripcion: string;
    imagenes: string[];
    precio: number;
    colores: string[];
    tallas: string[];
    modelo: string;
    oferta: boolean;
}