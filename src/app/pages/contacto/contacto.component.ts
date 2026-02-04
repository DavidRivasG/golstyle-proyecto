import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

  correo: string = '';
  asunto: string = '';
  mensaje: string = '';
  idPedido: string = '';

  enviar() {
    // Lógica para enviar el formulario
    console.log('Correo:', this.correo);
    console.log('Asunto:', this.asunto);
    console.log('Mensaje:', this.mensaje);
    if (this.asunto === 'localizar-pedido') {
      console.log('ID Pedido:', this.idPedido);
    }
    // Aquí podrías enviar a un servicio
    alert('Mensaje enviado correctamente.');
  }

}
