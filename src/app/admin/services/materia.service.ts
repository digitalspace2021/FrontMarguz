import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
    return this.http.post<IMateria>(this.url, {
      json: JSON.stringify(materia),
    });
  }

  updateMateria(materia: Materia) {
    console.log(materia);
    return this.http.put<IMateria>(this.url, {
      json: JSON.stringify(materia),
    });
  }

  deleteMateria(id: any) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
