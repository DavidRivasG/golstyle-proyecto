export interface StripeIntentResponse {

  clientSecret: string;
}

export interface ConfirmarPedidoReq {

  cod_dir: number;
  stripe_id: string;
}

export interface ConfirmarPedidoRes {

  mensaje: string;
  cod_ped: number;
}
