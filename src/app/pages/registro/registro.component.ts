import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  registerForm: FormGroup;
  cargando = false;
  submitted = false;
  exitoRegistro = signal<{ titulo: string; subtitulo: string } | null>(null);
  errorRegistroModal = signal<string | null>(null);

  // Injección de servicios
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  constructor() {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required]],
      ape1: ['', [Validators.required]],
      ape2: [''],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  registrar() {
    this.submitted = true;
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) return;

    this.cargando = true;

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.cargando = false;
        this.exitoRegistro.set({
          titulo: '¡Cuenta Creada!',
          subtitulo: 'Te hemos enviado un correo de verificación. Confírmalo antes de iniciar sesión.'
        });
      },
      error: (err) => {
        console.error(err);
        this.cargando = false;
        if (err.status === 422 && err.error?.errors?.correo) {
          this.errorRegistroModal.set('Este correo electrónico ya está registrado.');
        } else {
          this.errorRegistroModal.set('Ha ocurrido un error. Inténtalo de nuevo.');
        }
      }
    });
  }

  cerrarExito() {
    this.exitoRegistro.set(null);
    this.router.navigate(['/login']);
  }

  irALogin() {
    this.router.navigate(['/login']);
  }

}
