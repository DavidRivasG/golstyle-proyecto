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

  fb = inject(FormBuilder);
  contactoService = inject(ContactoService);

  respuesta = '';
  error = false;

  form = this.fb.group({

    correo: ['', [Validators.required, Validators.email]],
    asunto: ['', Validators.required],
    mensaje: ['', Validators.required],
    idPedido: ['']
  });

  enviar() {

    if (this.form.invalid) {

      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.value;

    this.contactoService.enviarMensaje(data).subscribe({
      next: (res) => {

        this.error = false;
        alert(res.mensaje || 'Mensaje enviado correctamente.');
        this.form.reset();
      },
      error: (err) => {

        this.error = true;
        alert(err.error?.mensaje || 'Error al enviar el mensaje');
      }
    });
  }
}
