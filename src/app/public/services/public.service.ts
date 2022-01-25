import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUsuario } from '../../admin/interfaces/IUsuario';



@Injectable({
  providedIn: 'root'
})
export class PublicService {
  url: string = 'https://marguz.co/marguzapi/public/profesores';

  constructor(private http: HttpClient) {}


  getProfesores(){
    return this.http.get<Array<IUsuario>>(this.url + "/" );
  }  
  getProfesor(id: any){
    return this.http.get<Array<IUsuario>>(`${this.url}/${id}`);
  }  
  getIdiomas(){
    return this.http.get<Array<IUsuario>>(this.url + "/" );
  }

}
