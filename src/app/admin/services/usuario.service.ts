import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../class/Usuario';
import { IUsuario } from '../interfaces/IUsuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
<<<<<<< HEAD
  address = env + 'users';
=======
>>>>>>> f8feb72a880007ea1217c9ccfcb10c6696fb89f1
  url: string = 'https://marguz.co/marguzapi/public/usuarios';

  constructor(private http: HttpClient) {}

  getUsuario(id :number){
    return this.http.get<IUsuario>(this.url + "/" + id );
  }

  listUsuario() {
    return this.http.get<IUsuario>(this.url);
  }

<<<<<<< HEAD
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

=======
>>>>>>> f8feb72a880007ea1217c9ccfcb10c6696fb89f1
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
