import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../class/Usuario';
import { IUsuario } from '../interfaces/IUsuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  url: string = 'https://marguz.co/marguzapi/public/usuarios';

  constructor(private http: HttpClient) {}

  listUsuario() {
    return this.http.get<IUsuario>(this.url);
  }

  createUsuario(Usuario: Usuario) {
    return this.http.post<IUsuario>(this.url, {
      json: JSON.stringify(Usuario),
    });
  }

  updateUsuario(Usuario: Usuario) {
    return this.http.put<IUsuario>(`${this.url}/${Usuario.id}`, {
      json: JSON.stringify({ Usuario: Usuario }),
    });
  }

  deleteUsuario(id: any) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
