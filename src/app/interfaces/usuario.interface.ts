export interface Usuario {
    cod_usu?: number;
    nombre: string;
    ape1: string;
    ape2?: string;
    correo: string;
    password: string;
    telefono?: string;
    rol: 'usuario' | 'administrador';
}
