import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemProductoComponent } from '../item-producto/item-producto.component';
import { ContenedorProductosComponent } from './contenedor-productos.component';
import { ProductServiceService } from '../../services/product-service.service';
import { Producto } from '../../interfaces/producto';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

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


  
});
