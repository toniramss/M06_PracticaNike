import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Register } from '../../interfaces/register';
import { postRegister } from '../../BDManagement/APIResquests';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {

    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      contrasenya: ['', Validators.required],
      repiteContrasenya: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['']
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(control: FormGroup) {
    const password = control.get('contrasenya')?.value;
    const confirmPassword = control.get('repiteContrasenya')?.value;
  
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
  
      if (this.registerForm.invalid) {
        console.log("Formulario inválido");
        return;
      }
  
  
      const register: Register = {
        email: this.registerForm.value.email,
        contrasenya: this.registerForm.value.contrasenya,
        nombre: this.registerForm.value.nombre,
        telefono: this.registerForm.value.telefono

      };


      //Llamar a la api para hacer register
      postRegister(register);

      alert("El usuario se ha creado correctamente");

      this.router.navigate(["/login"]);
  
    }

}
