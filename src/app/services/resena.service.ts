import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ResenaCrear } from '../interfaces/Resena';

@Injectable({
    providedIn: 'root'
})

export class ResenaService {
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    private getHeaders() {

        const token = localStorage.getItem('auth_token');

        return new HttpHeaders({

            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
    }

    getResenas(idCamiseta: number): Observable<any> {

        return this.http.get(`${this.apiUrl}/camisetas/${idCamiseta}/resenas`, { headers: this.getHeaders() });
    }

    crearResena(idCamiseta: number, resena: ResenaCrear) {

        return this.http.post(`${this.apiUrl}/camisetas/${idCamiseta}/resena`, resena, { headers: this.getHeaders() });
    }

    eliminarResena(idResena: number) {

        return this.http.delete(`${this.apiUrl}/resenas/${idResena}/eliminar`, { headers: this.getHeaders() });
    }

    editarResena(idResena: number, resena: ResenaCrear) {

        return this.http.put(`${this.apiUrl}/resenas/${idResena}/editar`, resena, { headers: this.getHeaders() });
    }

    reaccionarResena(idResena: number, tipo: 'like' | 'dislike') {

        return this.http.post(`${this.apiUrl}/resenas/${idResena}/reaccionar`, { tipo }, { headers: this.getHeaders() });
    }



}