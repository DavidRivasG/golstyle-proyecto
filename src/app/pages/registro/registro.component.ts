import { Component } from '@angular/core';
import { Usuario } from '../../interfaces/usuario.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  nuevoUsuario: Usuario = {
    nombre: '',
    ape1: '',
    ape2: '',
    correo: '',
    password: '',
    telefono: '',
    rol: 'usuario',
  };

  get apellidos(): string {
    return `${this.nuevoUsuario.ape1} ${this.nuevoUsuario.ape2}`.trim();
  }

  set apellidos(value: string) {
    const parts = value.trim().split(/\s+/);
    this.nuevoUsuario.ape1 = parts[0] || '';
    this.nuevoUsuario.ape2 = parts.slice(1).join(' ') || '';
  }

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  registrar() {

    this.usuarioService.registrar(this.nuevoUsuario).subscribe(resp => {
      console.log(resp);

      if (resp.ok) {

        // Reiniciar el formulario
        this.nuevoUsuario = {
          nombre: '',
          ape1: '',
          ape2: '',
          correo: '',
          password: '',
          telefono: '',
          rol: 'usuario',
        }
        alert('Registro completado con éxito');
        this.router.navigate(['/login']);
      }
    });

  }

  irALogin() {
    this.router.navigate(['/login']);
  }

}
