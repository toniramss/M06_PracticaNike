import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../interfaces/login';
import { postLogin } from '../../BDManagement/APIResquests';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true
})

export class LoginComponent {


  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {



    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      contrasenya: ['', Validators.required]
    });
  }


  async onSubmit() {

    if (this.loginForm.invalid) {
      console.log("Formulario inválido");
      return;
    }


    const login: Login = {
      email: this.loginForm.value.email,
      contrasenya: this.loginForm.value.contrasenya,
    };


    try {
      const response = await postLogin(login);
      console.log("Respuesta login:", response);

      if (response.user.rol === 'a') {
        console.log("usuario administrador");
      } else {
        console.log("Usuario normal");
      }



      sessionStorage.setItem("token", response.token);
      sessionStorage.setItem("user", response.user);
      console.log("IdUsuario: ", response.user.idUser);
      sessionStorage.setItem("idUsuario", response.user.idUser);
      sessionStorage.setItem("tipoUsuario", response.user.rol);


      this.router.navigate(["/home"]);

    } catch (error) {
      console.error("Error en el login:", error);
    }

  }

}
