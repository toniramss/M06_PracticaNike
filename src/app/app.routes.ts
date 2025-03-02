import { Routes } from '@angular/router';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { ContenedorProductosComponent } from './components/contenedor-productos/contenedor-productos.component';
import { ContenedorAdminComponent } from './components/contenedor-admin/contenedor-admin.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponentComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'productos', component: ContenedorProductosComponent},
    {path: 'admin', component: ContenedorAdminComponent}
];
