import { CommonModule } from "@angular/common";
import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { Resena } from "../../interfaces/Resena";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'app-resena-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './resena-card.component.html',
    styleUrl: './resena-card.component.css'
})

export class ResenaCardComponent {

    @Input({ required: true }) resena!: Resena;
    @Input() eliminando = false;

    @Output() reaccionar = new EventEmitter<'like' | 'dislike'>();
    @Output() eliminar = new EventEmitter<number>();
    @Output() editar = new EventEmitter<Resena>();

    authService = inject(AuthService);

    onBorrar() {

        this.eliminar.emit(this.resena.cod_res);
    }

    onEditar() {

        this.editar.emit(this.resena);
    }

    onReaccionar(tipo: 'like' | 'dislike') {

        this.reaccionar.emit(tipo);
    }

}