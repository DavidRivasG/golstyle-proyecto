import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  iniciarSesion() {

    if (this.email && this.password) {
      
      const usuarioSimulado = {
        nombre: 'Carlos', 
        email: this.email,
        rol: 'usuario'
      };

      localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioSimulado));

      this.router.navigate(['/home']);
    } else {
      alert('Por favor rellena los campos');
    }
  }

  registrarse() {
    console.log("Ir a registro...");
  }
}