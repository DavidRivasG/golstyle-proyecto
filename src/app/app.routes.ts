import { Routes } from '@angular/router';
import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CarritoPageComponent } from './pages/carrito-page/carrito-page.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { CatalogoPageComponent } from './pages/catalogo-page/catalogo-page.component';
import { DetalleCamisetaComponent } from './pages/detalle-camiseta/detalle-camiseta.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { MisPedidosComponent } from './pages/mis-pedidos/mis-pedidos.component';
import { DetallesPedidoComponent } from './pages/detalles-pedido/detalles-pedido.component';
import { DireccionesPageComponent } from './pages/direcciones-page/direcciones-page.component';
import { DireccionesCrearPageComponent } from './pages/direcciones-crear-page/direcciones-crear-page.component';
import { DireccionesEditarPageComponent } from './pages/direcciones-editar-page/direcciones-editar-page.component';
import { authGuard } from './guards/auth.guard';
import { publicGuard } from './guards/public-guard.guard';
import { VerificarEmailComponent } from './pages/verificar-email/verificar-email.component';


export const routes: Routes = [
    { path: '', component: HomeComponent }, // Página principal
    { path: 'registro', component: RegistroComponent , canActivate: [publicGuard]}, // Formulario de registro
    { path: 'login', component: LoginComponent , canActivate: [publicGuard]}, // Formulario de login
    { path: 'carrito', component: CarritoPageComponent }, // Carrito
    { path: 'contacto', component: ContactoComponent }, // Contacto
    { path: 'catalogo', component: CatalogoPageComponent }, // Catalogo
    { path: 'camiseta/:id', component: DetalleCamisetaComponent }, // Camiseta
    { path: 'perfil', component: PerfilComponent , canActivate: [authGuard]}, // Perfil
    { path: 'mis-pedidos', component: MisPedidosComponent , canActivate: [authGuard]}, // Pedidos
    { path: 'detalles-pedido/:id', component: DetallesPedidoComponent , canActivate: [authGuard]}, // Detalle de pedido
    { path: 'direcciones', component: DireccionesPageComponent , canActivate: [authGuard]}, // Lista y borrar
    { path: 'direcciones/crear', component: DireccionesCrearPageComponent , canActivate: [authGuard]}, // Crear dirección
    { path: 'direcciones/editar/:id', component: DireccionesEditarPageComponent , canActivate: [authGuard]}, // Editar dirección
    { path: 'verificar-email', component: VerificarEmailComponent }, // Página de verificación de email
    { path: '**', redirectTo: '', pathMatch: 'full' }

];
