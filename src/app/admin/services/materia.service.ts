import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Materia } from '../class/Materia';
import { IMateria } from '../interfaces/IMateria';

@Injectable({
  providedIn: 'root',
})
export class MateriaService {
  url: string = 'https://marguz.co/marguzapi/public/materias';

  constructor(private http: HttpClient) {}

  listMateria() {
    return this.http.get<IMateria>(this.url);
  }

  createMateria(materia: Materia) {
    let formData = new FormData();
    let json = `'json' : {"materia" : "${materia.materia}"}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<IMateria>(this.url, json, { headers });
  }

  updateMateria(materia: Materia) {
    return this.http.put<IMateria>(this.url, materia);
  }

  deleteMateria(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
