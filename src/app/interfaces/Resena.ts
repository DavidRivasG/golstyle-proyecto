export interface ResenaCrear {

    comentario: string;
    puntuacion: number;
}

export interface Resena {

    cod_res: number;
    usuario: string;
    puntuacion: number;
    comentario: string;
    likes: number;
    dislikes: number;
    es_mia: boolean;
    fecha: string;
}