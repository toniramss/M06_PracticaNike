import { TestBed } from '@angular/core/testing';
import { ProductServiceService } from './product-service.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { Producto } from '../interfaces/producto';
import { of } from 'rxjs';

describe('ProductServiceService', () => {
  let service: ProductServiceService;
  let httpMock: HttpTestingController;

  const productoEjemplo: Producto = {
    id: 1,
    nombre: 'Nike Air Force 1',
    precio: 100,
    descripcion: 'Zapatillas clásicas',
    stock: 10,
    tipoProducto: 'Zapatillas',
    imagenes: 'url_imagen1',
    modelo: 'AF1',
    oferta: true
  };

  const productosEjemplo: Producto[] = [
    {
      id: 1,
      nombre: 'Nike Air Force 1',
      precio: 100,
      descripcion: 'Zapatillas clásicas',
      stock: 10,
      tipoProducto: 'Zapatillas',
      imagenes: 'url_imagen1',
      modelo: 'AF1',
      oferta: true
    },
    {
      id: 2,
      nombre: 'Nike Air Max 90',
      precio: 120,
      descripcion: 'Zapatillas deportivas',
      stock: 5,
      tipoProducto: 'Zapatillas',
      imagenes: 'url_imagen2',
      modelo: 'AM90',
      oferta: false
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [ProductServiceService, provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(ProductServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica si hay solicitudes pendientes
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deberia cargar productos de la API', () => {
    // Simulamos la llamada a la API para cargar productos
    service.loadProductos();

    // Comprobamos que la solicitud HTTP fue realizada
    const req = httpMock.expectOne('http://localhost:3000/getProductos');
    expect(req.request.method).toBe('GET');

    // Respondemos con los datos simulados
    req.flush(productosEjemplo);

    // Verificamos que el Signal se ha actualizado con los datos recibidos
    const productos = service.productos();  // Accedemos al valor de Signal directamente
    expect(productos.length).toBe(2);
    expect(productos[0].nombre).toBe('Nike Air Force 1');
  });



  it('should add a product', async () => {

    // Simulamos la adición de un producto
    service.agregarDato(productoEjemplo);

    // Esperamos que la lista de productos contenga al producto agregado
    const productos = service.productos();
    expect(productos.length).toBe(1); // Ya hay un producto en la lista
    expect(productos[0].nombre).toBe('Nike Air Force 1');
  });




  it('should delete a product', () => {
    // Preparamos el Signal con productos
    const productosEjemplo = [
      { id: 1, nombre: 'Nike Air Force 1', precio: 100, descripcion: 'Zapatillas clásicas', stock: 10, tipoProducto: 'Zapatillas', imagenes: 'url_imagen1', modelo: 'AF1', oferta: true },
      { id: 2, nombre: 'Nike Air Max 90', precio: 120, descripcion: 'Zapatillas deportivas', stock: 5, tipoProducto: 'Zapatillas', imagenes: 'url_imagen3', modelo: 'AM90', oferta: false }
    ];

    // Simulamos la carga de productos desde la API
    service.loadProductos();
    const req = httpMock.expectOne('http://localhost:3000/getProductos');
    expect(req.request.method).toBe('GET');
    req.flush(productosEjemplo); // Respondemos con los productos simulados

    // Ahora, simulamos la eliminación de un producto
    service.deleteProducto(1);

    // Comprobamos que la solicitud HTTP DELETE fue realizada
    const deleteReq = httpMock.expectOne('http://localhost:3000/deleteProducto/1');
    expect(deleteReq.request.method).toBe('DELETE');
    deleteReq.flush({}); // Respondemos con un objeto vacío para simular una eliminación exitosa

    // Verificamos que el producto se ha eliminado
    const productos = service.productos(); // Accedemos al valor actual del Signal
    expect(productos.length).toBe(1); // El producto con id 1 debe haber sido eliminado
    expect(productos[0].nombre).toBe('Nike Air Max 90');
  });

});


