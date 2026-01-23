import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  iniciarSesion() {
    console.log("Conectando con base de datos...");

    const datosLogin = {
      email: this.email,
      password: this.password
    };


    this.http.post('http://localhost:8080/login.php', datosLogin)
      .subscribe({
        next: (respuesta: any) => {
          console.log("Respuesta del servidor:", respuesta);

          if (respuesta.success === true) {
            localStorage.setItem('usuarioLogueado', JSON.stringify(respuesta.usuario));
            this.router.navigate(['/home']);
          } else {
            alert(' ERROR: ' + respuesta.mensaje);
          }
        },
        error: (error) => {
          console.error("Error de conexión:", error);
          alert(' No se pudo conectar con el servidor PHP (Puerto 8080)');
        }
      });
  }
}