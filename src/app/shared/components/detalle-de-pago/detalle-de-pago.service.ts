import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetalleDePagoService {
  route = environment;
  headers!: HttpHeaders;
  user = localStorage.getItem('user') || undefined;
  constructor( private http: HttpClient ) { this.generarToken() }

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

  getTeacherPayment(id:number){
    return this.http.get(`${this.route.host}payment/show/${id}`);
  }

  save(data:any){
    return this.http.post(`${this.route.host}payment`, data, {
      headers: this.headers,
    });
  }

  update( data:any, id:number ){
    return this.http.put(`${this.route.host}payment/${id}`, data, {
      headers: this.headers,
    });
  }

}
