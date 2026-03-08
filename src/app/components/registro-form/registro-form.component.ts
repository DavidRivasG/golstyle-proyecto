import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro-form.component.html',
  styleUrl: './registro-form.component.css'
})
export class RegistroFormComponent {
  registerForm: FormGroup;

  @Output() onRegister = new EventEmitter<any>();
  @Output() onLoginRedirect = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required]],
      ape1: ['', [Validators.required]],
      ape2: [''], // Opcional en tu controlador
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rol: ['cliente', [Validators.required]] // Valor por defecto
    });
  }

  submit() {
    if (this.registerForm.valid) {
      this.onRegister.emit(this.registerForm.value);
    }
  }
}