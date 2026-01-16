import { Component } from '@angular/core';
import { Usuario } from '../../interfaces/usuario.interface';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule],
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

  constructor(private usuarioService: UsuarioService) { }

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
      }
    });

  }


}
