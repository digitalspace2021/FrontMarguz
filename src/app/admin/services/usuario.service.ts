import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../class/Usuario';
import { IUsuario } from '../interfaces/IUsuario';

const env = environment.host;
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  address = env + 'users';
  url: string = 'https://marguz.co/marguzapi/public/usuarios';

  constructor(private http: HttpClient) {}

  getUsuario(id :number){
    return this.http.get<IUsuario>(this.url + "/" + id );
  }

  listUsuario() {
    return this.http.get<IUsuario>(this.url);
  }

  listUsuarioStudent() {
    let url = `${this.address}/students`
    return this.http.get(url);
  }

  listUsuarioTeacher() {
    let url = `${this.address}/teachers`
    return this.http.get(url);
  }

  listUsuarioAdmin() {
    let url = `${this.address}/administrators`
    return this.http.get(url);
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
