import { SocialAuthService, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, GoogleSigninButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  cargando = false;
  errorLogin = signal<string>('');
  private authSubscription!: Subscription;

  private authService = inject(AuthService);
  private socialAuthService = inject(SocialAuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  constructor() {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.loginForm.valueChanges.subscribe(() => this.errorLogin.set(''));
  }

  ngOnInit() {

    this.authSubscription = this.socialAuthService.authState.subscribe({

      next: (user) => {

        if (user) {

          console.log('Google User:', user);

          this.authService.loginConGoogle(user.idToken).subscribe({

            next: (res) => {

              console.log('Login con Google exitoso:', res.usuario.nombre);
              this.router.navigate(['/']);
            },
            error: (err) => {

              alert(err.error.message || 'Credenciales incorrectas');
            }
          });
        }
      }
    });
  }


  ngOnDestroy() {

    if (this.authSubscription) {

      this.authSubscription.unsubscribe();
    }
  }


  // Iniciar sesión
  iniciarSesion() {

    if (this.loginForm.invalid) return;

    this.cargando = true;
    this.authService.login(this.loginForm.value).subscribe({

      next: (res) => {

        console.log('Login exitoso:', res.usuario.nombre);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorLogin.set(err.error?.message || 'Correo o contraseña incorrectos. Inténtalo de nuevo.');
        this.cargando = false;
        setTimeout(() => this.errorLogin.set(''), 4000);
      }
    });
  }

  irARegistro() {
    this.router.navigate(['/registro']);
  }
}
