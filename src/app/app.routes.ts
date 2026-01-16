import { Routes } from '@angular/router';
import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, // Página principal
    { path: 'registro', component: RegistroComponent }, // Formulario de registro
];
