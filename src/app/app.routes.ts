import { Routes } from '@angular/router';
import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CarritoPageComponent } from './pages/carrito-page/carrito-page.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { CatalogoPageComponent } from './pages/catalogo-page/catalogo-page.component';


export const routes: Routes = [
    { path: '', component: HomeComponent }, // Página principal
    { path: 'registro', component: RegistroComponent }, // Formulario de registro
    { path: 'login', component: LoginComponent }, // Formulario de login
    { path: 'carrito', component: CarritoPageComponent }, // Carrito
    { path: 'contacto', component: ContactoComponent }, // Contacto
    { path: 'catalogo', component: CatalogoPageComponent } // Catalogo

];
