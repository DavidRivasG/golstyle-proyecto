import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegistroFormComponent } from '../../components/registro-form/registro-form.component';

@Component({
  selector: 'app-registro-page',
  standalone: true,
  imports: [RegistroFormComponent],
  template: `
    <app-registro-form 
      (onRegister)="handleRegister($event)" 
      (onLoginRedirect)="goToLogin()">
    </app-registro-form>
  `
})
export class RegistroComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

handleRegister(userData: any) {
  this.authService.register(userData).subscribe({
    next: (res) => {
      console.log('Usuario registrado con éxito');
      this.goToLogin(); 
    },
    error: (err) => console.error(err)
  });
}

  goToLogin() {
    this.router.navigate(['/login']);
  }
}