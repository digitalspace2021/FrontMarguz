import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Materia } from '../class/Materia';
import { IMateria } from '../interfaces/IMateria';

const api = environment.host;

@Injectable({
  providedIn: 'root',
})
export class MateriaService {
  url: string = 'https://marguz.co/marguzapi/public/materias';

  constructor(private http: HttpClient) {}

  listInteresOrLenguages() {
    let endPoint = api + 'api/v1/auth/register/InterestOrLanguages';
    return this.http.get<IMateria>(endPoint);
  }

  listMateria() {
    return this.http.get<IMateria>(this.url);
  }

  createMateria(materia: Materia) {
    return this.http.post<IMateria>(this.url, {
      json: JSON.stringify(materia),
    });
  }

  updateMateria(materia: Materia) {
    return this.http.put<IMateria>(`${this.url}/${materia.id}`, {
      json: JSON.stringify({ materia: materia.materia }),
    });
  }

  deleteMateria(id: any) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
