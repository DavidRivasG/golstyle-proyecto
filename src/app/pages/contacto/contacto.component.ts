import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ContactoService } from '../../services/contacto.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

  // Injección de servicio
  fb = inject(FormBuilder);
  contactoService = inject(ContactoService);

  estadoEnvio: 'enviando' | 'enviado' | 'error' | null = null;

  form = this.fb.group({

    correo: ['', [Validators.required, Validators.email]],
    asunto: ['', Validators.required],
    mensaje: ['', Validators.required],
    idPedido: ['']
  });

  // Enviar el mensaje
  enviar() {

    this.estadoEnvio = 'enviando';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.value;

    this.contactoService.enviarMensaje(data).subscribe({
      next: (res) => {

        this.estadoEnvio = 'enviado';
        this.form.reset();
      },
      error: (err) => {

        this.estadoEnvio = 'error';
      }
    });
  }
}
