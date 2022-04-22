import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const env = environment.host;

@Injectable({
  providedIn: 'root',
})
export class ClassService {

  endpointUpdateTeacher = env + 'admin/profile/user/';

  url: string = 'https://marguz.co/marguzapi/public/users';
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


  getClassList() {
    this.generarToken();
    let url = `${env}admin/lessons`;
    return this.http.get(url, { headers: this.headers });
  }


  deleteClass(id: string) {
    this.generarToken();
    let url = `${env}admin/lesson/${id}`;
    return this.http.delete(url, { headers: this.headers });
  }
}
