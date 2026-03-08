export interface Camiseta {

    cod_cam: number;
    nombre: string;
    imagen_principal: string | null;
    precio: number;
    equipo: string | null;
    liga: string | null;
    seleccion: string | null;
    temporada: string;
}
