export interface Pedido {
  cod_ped: number;
  fecha: string;
  total: number;
  estado: string;
  cod_usu: number;
  cod_dir: number;
  detalles?: DetallePedido[];
  direccion?: Direccion;
}

export interface DetallePedido {
  cod_det_ped: number;
  precio_unid: number;
  cantidad: number;
  cod_ped: number;
  cod_var: number;
  nombre_personalizado: string | null;
  dorsal_personalizado: number | null;
}

export interface Direccion {
  cod_dir: number;
  calle: string;
  num: number;
  piso: string;
  cp: string;
  telefono: number;
  ciudad: string;
  provincia: string;
  cod_usu: number;
}

export interface Camiseta {
  cod_cam: number;
  nombre: string;
  color: string;
  cod_equi: number | null;
  cod_sel: number | null;
  cod_tem: number;
  precio: number;
  imagen_principal: string;
}