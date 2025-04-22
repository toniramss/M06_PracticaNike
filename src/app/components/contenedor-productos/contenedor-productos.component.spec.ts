import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemProductoComponent } from '../item-producto/item-producto.component';
import { ContenedorProductosComponent } from './contenedor-productos.component';
import { ProductServiceService } from '../../services/product-service.service';
import { Producto } from '../../interfaces/producto';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Signal } from '@angular/core';

describe('ContenedorProductosComponent', () => {
  let component: ContenedorProductosComponent;
  let fixture: ComponentFixture<ContenedorProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ContenedorProductosComponent,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ContenedorProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deberia crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar la lista de productos correctamente', () => {
    expect(component.listaProductos).toBeDefined();
  });

  /* it('debería contener productos después de la carga', () => {
    console.log("Lista de productos: ", component.listaProductos());
    // Simulamos la carga de productos
    fixture.detectChanges();
    expect(component.listaProductos.length).toBeGreaterThan(0);
  }); */
  /* it('should load products on init', () => {
    // Llamamos al método de inicialización del componente
    component.ngOnInit();

    // Accedemos directamente al valor de la Signal
    const productos = component.listaProductos();

    expect(productos.length).toBe(2);
    expect(productos[0].nombre).toBe('Nike Air Force 1');
    expect(productos[1].nombre).toBe('Nike Air Max 90');
  }); */


});
