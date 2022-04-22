import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const env = environment.host;

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  address = env + 'admin/profile';
  user = localStorage.getItem('user') || undefined;
  headers!: HttpHeaders;

  constructor(private http: HttpClient) {}

  generarToken() {
    let token;
    this.user = localStorage.getItem('user') || undefined;
    if (this.user) {
      token = JSON.parse(this.user).access_token;
    }
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + token,
    });
  }

  searchTearcher(data: any) {
    let url = `${env}users/search/teachers`;
    return this.http.post(url, data, { headers: this.headers });
  }

  getUsuarioTeacher(id: number) {
    let url = `${this.address}/user/${id}`;
    return this.http.get(url, { headers: this.headers });
  }
}
