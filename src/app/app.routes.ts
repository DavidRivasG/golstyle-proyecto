import { Routes } from '@angular/router';
import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CarritoPageComponent } from './pages/carrito-page/carrito-page.component';


export const routes: Routes = [
    { path: '', component: HomeComponent }, // Página principal
    { path: 'registro', component: RegistroComponent }, // Formulario de registro
    { path: 'login', component: LoginComponent }, // Formulario de login
    { path: 'carrito', component: CarritoPageComponent } // Carrito

];
