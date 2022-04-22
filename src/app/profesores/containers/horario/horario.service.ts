import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  route = environment;
  headers!: HttpHeaders;
  constructor( private http: HttpClient ) { }

  saveScheduleNews( data:any, id:number ){
    return this.http.post(`${this.route.host}schedules/teacher/${id}`, data, {
      headers: this.headers,
    });
  }

}
