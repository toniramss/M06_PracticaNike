import { ChangeDetectionStrategy, Component, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

import { ProductServiceService } from '../../services/product-service.service';
import { Producto } from '../../interfaces/producto';

import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-contenedor-admin',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatCheckboxModule, MatSelectModule, HttpClientModule],
  templateUrl: './contenedor-admin.component.html',
  styleUrl: './contenedor-admin.component.css'
})


export class ContenedorAdminComponent {

  listaProductos: Signal<Producto[]>;

  imagenPreview: string | null = null; // Para mostrar la vista previa de la imagen
  subiendoImagen: boolean = false; // Para indicar que la imagen se está subiendo
  imagenSubida: boolean = false; // Para mostrar mensaje de éxito


  /* productService = new ProductServiceService(); */

  productForm: FormGroup;

  listaTiposProductos: string[] = ["Ropa", "Zapatillas", "Accesorios"];



  constructor(private fb: FormBuilder, private productService: ProductServiceService, private http: HttpClient) {

    this.listaProductos = this.productService.obtenerDatos();

    console.log("Lista de productos: ", this.listaProductos());


    this.productForm = this.fb.group({
      numReferencia: ['', Validators.required],
      nombreProducto: ['', [Validators.required, Validators.minLength(3), /* this.validarNombreProducto */]],
      precio: [0, [Validators.required, this.validarNumeroNegativo]],
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      tipoProducto: ['', Validators.required],
      oferta: [false, Validators.required],
      imagen: ['', Validators.required],


      //colores: ['', Validators.required],
      //tallas: ['', Validators.required],

    });
  }


  validarNumeroNegativo(campo: FormControl) {
    if (campo.value < 0) {
      return { error: true };
    } else {
      return null;
    }
  }

  validarNombreProducto(campo: FormControl) {

    const productos = this.listaProductos();

    if (productos.length > 0) {
      const nombreIngresado = campo.value?.toLowerCase();
      //const productoExistente = this.listaProductos().find(producto => producto.nombre === nombreIngresado);

      let i = 0;
      let encontrado = false;
      while (!encontrado && i < productos.length) {
        if (productos[i].nombre.toLowerCase() == nombreIngresado) {
          encontrado = true;
        }
        i++;
      }

      if (encontrado) {
        return { error: true };
      }
      return null;
    }
    return null;

  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.subirImagen(file);
    }
  }


  subirImagen(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    this.subiendoImagen = true; // Mostrar mensaje de carga

    this.http.post<{ fileName: string }>('http://192.168.1.133:3000/upload', formData)
      .subscribe({
        next: (response) => {
          const imageUrl = `http://192.168.1.133:3000/uploads/${response.fileName}`;
          this.productForm.patchValue({ imagen: imageUrl }); // Guardar la URL en el formulario
          this.subiendoImagen = false;
          this.imagenSubida = true;
        },
        error: (error) => {
          console.error('Error al subir la imagen:', error);
          this.subiendoImagen = false;
        }
      });
  }


  onSubmit() {

    if (this.productForm.invalid) {
      console.log("Formulario inválido");
      return;
    }


    //construtor() {}



    const producto: Producto = {
      id: crypto.randomUUID(),
      nombre: this.productForm.value.nombreProducto,
      tipoProducto: this.productForm.value.tipoProducto,
      descripcion: this.productForm.value.descripcion,
      imagenes: [this.productForm.value.imagen],
      precio: this.productForm.value.precio,
      colores: [this.productForm.value.colores],
      tallas: [this.productForm.value.tallas],
      modelo: this.productForm.value.numReferencia,
      oferta: this.productForm.value.oferta,
    };

    this.productService.agregarDato(producto);





  }



}
