import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.http.post<IMateria>(this.url, materia);
  }

  updateMateria(materia: Materia) {
    return this.http.put<IMateria>(this.url, materia);
  }

  deleteMateria(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
