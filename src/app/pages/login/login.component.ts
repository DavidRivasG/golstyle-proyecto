import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginFormComponent } from '../../components/login-form/login-form.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginFormComponent],
  template: `
    <app-login-form 
      (onLogin)="handleLogin($event)" 
      (onRegisterRedirect)="navigateToRegister()">
    </app-login-form>
  `
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  handleLogin(credentials: any) {
    this.authService.login(credentials).subscribe({
      next: (res) => {
        // Al loguear, Laravel nos da el token y los datos del usuario
        console.log('Login exitoso:', res.usuario.nombre);
        this.router.navigate(['/home']); // Redirigimos a la página principal
      },
      error: (err) => {
        // Manejamos el error 401 que configuramos en Laravel
        alert(err.error.message || 'Credenciales incorrectas');
      }
    });
  }

  navigateToRegister() {
    this.router.navigate(['/registro']);
  }
}