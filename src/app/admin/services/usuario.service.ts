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
  url: string = 'https://marguz.co/marguzapi/public/users';

  constructor(private http: HttpClient) {}

  getUsuario(id :number){
    return this.http.get<IUsuario>(this.address + "/" + id );
  }

  listUsuario() {
    return this.http.get<IUsuario>(this.address);
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


  registerStudent(data: any) {
    let url = `${this.address}/student`
    return this.http.post(url, data);
  }

  registerTeacher(data: any) {
    let url = `${this.address}/teacher`
    return this.http.get(url, data);
  }

  registerAdmin(data: any) {
    let url = `${this.address}/administrator`
    return this.http.get(url, data);
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
    return this.http.delete(`${this.address}/${id}`);
  }
  habilitar(id: any){
    return this.http.put(`${this.address}/status/${id}`, {});

  }
}
