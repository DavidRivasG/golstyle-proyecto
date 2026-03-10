export interface ProductoCarrito{

    cod_det_carr: number;
    cantidad: number;

    nombre_personalizado: string | null;
    dorsal_personalizado: number | null;

    nombre_camiseta: string;
    precio: number;
    subtotal: number;

    talla: string;
    stock: number;

    imagen: string | null;
}