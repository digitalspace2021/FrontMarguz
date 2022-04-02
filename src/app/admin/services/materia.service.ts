import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Materia } from '../class/Materia';
import { IMateria } from '../interfaces/IMateria';

const api = environment.host;

@Injectable({
  providedIn: 'root',
})
export class MateriaService {
  endPointReg = api + 'auth/register/InterestOrLanguages';
  endPoint = api + 'InterestOrLanguages';

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

  listRegInteresOrLenguages() {
    return this.http.get<IMateria>(this.endPointReg);
  }

  listInteresOrLenguages() {
    return this.http.get<IMateria>(this.endPointReg, { headers: this.headers });
  }

  createInteresOrLenguages(materia: Materia) {
    return this.http.post<IMateria>(this.endPoint, materia, {
      headers: this.headers,
    });
  }

  updateInteresOrLenguages(materia: Materia) {
    return this.http.put<IMateria>(`${this.endPoint}/${materia.id}`, materia, {
      headers: this.headers,
    });
  }

  deleteInteresOrLenguages(id: any) {
    return this.http.delete(`${this.endPoint}/${id}`, {
      headers: this.headers,
    });
  }
}
