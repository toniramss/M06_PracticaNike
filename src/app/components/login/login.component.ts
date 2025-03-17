import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true
})

export class LoginComponent {


  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {



    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      contrasenya: ['', Validators.required]
    });
  }


  onSubmit() {
  
      if (this.loginForm.invalid) {
        console.log("Formulario inválido");
        return;
      }
  
  
      const login = {
        email: this.loginForm.value.email,
        contrasenya: this.loginForm.value.contrasenya,
      };


      //Llamar a la api para hacer login
        
  
    }

}
