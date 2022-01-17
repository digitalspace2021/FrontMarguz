import { IMateria } from './../interfaces/IMateria';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InteresesService {
  url: string = 'https://marguz.co/marguzapi/public/materias';

  constructor(private http: HttpClient) { }

  listIntereses() {
    return this.http.get<IMateria>(this.url);
  }
}
