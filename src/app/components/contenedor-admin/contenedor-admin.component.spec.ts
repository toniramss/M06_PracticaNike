import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorAdminComponent } from './contenedor-admin.component';

describe('ContenedorAdminComponent', () => {
  let component: ContenedorAdminComponent;
  let fixture: ComponentFixture<ContenedorAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenedorAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenedorAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deberia crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario', () => {
    expect(component.productForm.value).toEqual({
      numReferencia: '',
      nombreProducto: '',
      precio: 0,
      descripcion: '',
      tipoProducto: '',
      oferta: false,
      stock: 0,
      imagen: ''
    });
  });

  it('debería marcar el formulario como inválido si el campo nombre producto esta vacio', () => {
    component.productForm.controls['nombreProducto'].setValue('');
    expect(component.productForm.invalid).toBeTrue();
  });

  it('debería marcar el formulario como inválido si el campo Nº de referencia esta vacio', () => {
    component.productForm.controls['numReferencia'].setValue('');
    expect(component.productForm.invalid).toBeTrue();
  });

  it('debería marcar el formulario como inválido todos los campos estan vacios', () => {
    component.productForm.controls['numReferencia'].setValue('');
    component.productForm.controls['nombreProducto'].setValue('');
    component.productForm.controls['precio'].setValue('');
    component.productForm.controls['descripcion'].setValue('');
    component.productForm.controls['tipoProducto'].setValue('');
    component.productForm.controls['oferta'].setValue('');
    component.productForm.controls['stock'].setValue('');
    component.productForm.controls['imagen'].setValue('');
    expect(component.productForm.invalid).toBeTrue();
  });

  it('debería rechazar un precio negativo', () => {
    component.productForm.controls['precio'].setValue(-5);
    expect(component.productForm.controls['precio'].valid).toBeFalse();
  });

  it('debería aceptar un precio positivo', () => {
    component.productForm.controls['precio'].setValue(5);
    expect(component.productForm.controls['precio'].valid).toBeTrue();
  });

  

});
