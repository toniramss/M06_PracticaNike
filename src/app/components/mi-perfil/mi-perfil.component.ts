import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { UpdateUsuario } from '../../interfaces/updateUsuario';
import { getUserId, putUpdateUsuario } from '../../BDManagement/APIResquests';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-mi-perfil',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatCheckboxModule, MatSelectModule],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.css'
})
export class MiPerfilComponent {

  idUsuario = Number(sessionStorage.getItem("idUsuario")) || 1;

  usuario: User = {
    id: 0,
    nombre: "",
    email: "",
    telefono: "",
    rol: "",
  }

  productForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.productForm = this.fb.group({
      nombrePerfilUsuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.minLength(3), /* this.validarNombreProducto */]],
      telefono: ['']
    });

  }

  async ngOnInit() {
    this.usuario = await getUserId(this.idUsuario);
  }

  async onSubmit() {

    if (this.productForm.invalid) {
      console.log("Formulario inválido");
      return;
    }

    const updateUsuario: UpdateUsuario = {
      nombre: this.productForm.value.nombrePerfilUsuario,
      email: this.productForm.value.email,
      telefono: this.productForm.value.telefono
    }

    await putUpdateUsuario(this.idUsuario, updateUsuario);


    this.usuario = await getUserId(this.idUsuario);

    alert("Datos actualizados correctamente");


  }


}
