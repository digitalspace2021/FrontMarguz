export interface IUsuario {
  status: string;
  code: number;
  message: string;
  usuarios: IDataUsuario[];
}

export interface IDataUsuario {
  id: number;
  name: string;
  lastname: string;
  cellphone: string;
  country: string;
  state: string;
  city: string;
  email: string;
  password: string;
  status: number;
  foto_perfil?: string;
  zona_horaria?: null;
  descripcion?: null | string;
  tipo_usuario: string;
  titulo_profesional?: null | string;
  valor_hora?: null | string;
  created_at?: Date;
  updated_at?: Date;
  idiomas?: Idioma[];
}

export interface Idioma {
  id: number;
  idioma: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}

export interface Pivot {
  profesor: string;
  idioma: string;
}

export interface Ilogin {
  email: string;
  password: string;
}
