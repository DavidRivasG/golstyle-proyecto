import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  cargando = false;
  errorLogin: string | null = null;

  // Injección de servicios
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  // Validación del formulario
  constructor() {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  // Iniciar sesión
  iniciarSesion() {
    if (this.loginForm.invalid) return;

    this.cargando = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log('Login exitoso:', res.usuario.nombre);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorLogin = err.error?.message || 'Correo o contraseña incorrectos. Inténtalo de nuevo.';
        console.error(this.errorLogin);
        this.cargando = false;
        setTimeout(() => this.errorLogin = null, 4000);
      }
    });
  }

  irARegistro() {
    this.router.navigate(['/registro']);
  }
}
