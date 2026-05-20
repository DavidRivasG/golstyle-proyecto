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
  errorCorreo = signal<string>('');

  // Injección de servicios
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  // Validación del formulario
  constructor() {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required]],
      ape1: ['', [Validators.required]],
      ape2: [''],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    // Limpiar el error de correo cuando el usuario lo modifique
    this.registerForm.get('correo')?.valueChanges.subscribe(() => {
      this.errorCorreo.set('');
    });
  }

  // Registro
  registrar() {
    if (this.registerForm.invalid) return;

    this.cargando = true;
    this.errorCorreo.set('');

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        this.cargando = false;
        // Errores del intento de registro
        if (err.status === 422 && err.error?.errors?.correo) {

          this.errorCorreo.set('Este correo electrónico ya está registrado.');
        } else {

          this.errorCorreo.set('Ha ocurrido un error. Inténtalo de nuevo.');
        }
      }
    });
  }

}
