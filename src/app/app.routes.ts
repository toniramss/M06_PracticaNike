import { Routes } from '@angular/router';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { ContenedorProductosComponent } from './components/contenedor-productos/contenedor-productos.component';
import { ContenedorAdminComponent } from './components/contenedor-admin/contenedor-admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MisPedidosComponent } from './components/mis-pedidos/mis-pedidos.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponentComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},

    {path: 'productos', component: ContenedorProductosComponent},
    {path: 'admin', component: ContenedorAdminComponent},
    {path: 'misPedidos', component: MisPedidosComponent}

];
