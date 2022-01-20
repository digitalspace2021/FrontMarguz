export interface Login {
  email?: string;
  contrasena?: string;
}

export interface DataUsuario {
  id?: number;
  nombre: string;
  apellido: string;
  telefono: string;
  pais: string;
  estado: string;
  ciudad: string;
  email: string;
  contrasena: string;
  foto_perfil?: string;
  tipo_usuario: number;
  created_at?: Date;
  updated_at?: Date;
}
