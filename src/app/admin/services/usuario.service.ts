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
  address2 = env + 'auth/user';
  address = env + 'users';

  endpointUpdateTeacher = env + 'admin/profile/user/';

  url: string = 'https://marguz.co/marguzapi/public/users';
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

  getUsuario(params = null) {

    if (params) {
      return this.http.get<IUsuario>(this.endpointUpdateTeacher + params, {
        headers: this.headers,
      });
    }

    return this.http.get<IUsuario>(this.address2, {
      headers: this.headers,
    });
  }

  listUsuario() {
    return this.http.get<IUsuario>(this.address);
  }
  listUsuarioStudent() {
    console.log(this.address);
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

  registerStudent(data: any) {
    let url = `${this.address}/student`;
    return this.http.post(url, data);
  }

  registerTeacher(data: any) {
    let url = `${this.address}/teacher`;
    return this.http.get(url, data);
  }

  registerAdmin(data: any) {
    let url = `${this.address}/administrator`;
    return this.http.get(url, data);
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
    return this.http.delete(`${this.address}/delete/${id}`, { headers: this.headers });
  }
  habilitar(data: any) {
    return this.http.post(`${this.address}/multiple/status/`, { users: data });
  }
}
