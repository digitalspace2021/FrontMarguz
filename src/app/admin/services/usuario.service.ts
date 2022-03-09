import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  user = localStorage.getItem('user') || undefined;
  headers!: HttpHeaders;

  constructor(private http: HttpClient) {
    this.generarToken();
  }

  generarToken() {
    let token;
    this.user = localStorage.getItem('user') || undefined;
    if (this.user) {
      token = JSON.parse(this.user).access_token;
    }
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: 'Bearer' + token,
    });
  }

  getUsuario(id: number) {
    return this.http.get<IUsuario>(this.address + '/' + id, {
      headers: this.headers,
    });
  }

  listUsuarioStudent() {
    let url = `${this.address}/students`;
    return this.http.get(url, { headers: this.headers });
  }

  listUsuarioTeacher() {
    let url = `${this.address}/teachers`;
    return this.http.get(url, { headers: this.headers });
  }

  listUsuarioAdmin() {
    let url = `${this.address}/administrators`;
    return this.http.get(url, { headers: this.headers });
  }

  createUsuario(Usuario: Usuario) {
    return this.http.post<IUsuario>(this.address, Usuario, {
      headers: this.headers,
    });
  }

  updateUsuario(Usuario: Usuario) {
    return this.http.put<IUsuario>(`${this.address}/${Usuario.id}`, Usuario, {
      headers: this.headers,
    });
  }

  deleteUsuario(id: any) {
    return this.http.delete(`${this.address}/${id}`, { headers: this.headers });
  }
}
