import { IUsuario } from './../../admin/interfaces/IUsuario';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../class/Login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
 address : string = `https://marguz.co/marguzapi/public/login`;

  constructor(private http: HttpClient) {}

  async login(login: Login) {

    return new Promise((resolve, reject) => {
      this.http.post<IUsuario>(this.address, {'json' : JSON.stringify(login) }, {
        })
        .subscribe(
          (data: any) => {
            resolve(data);
          },
          (error: any) => {
            reject(new Error(error.message));
          }
        );
    });
  }
  
  async logout(){
    
  }

  async getCountriesToken() {
    let email = 'jhonat.rodri@gmail.com';
    let token =
      'r-eTNoVb6d9vEIqE_71-sMryUtYbuMz7zR-v1ds3MsU69mqlz3pK0uUDOKkCR4NKIDM';
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('api-token', token);
    headers = headers.append('user-email', email);
    //let endpoint = "/inquiry";
    let endpoint = 'https://www.universal-tutorial.com/api/getaccesstoken';

    return new Promise((resolve, reject) => {
      this.http
        .get(endpoint, {
          headers: headers,
        })
        .subscribe(
          (data: any) => {
            let apiToken = data.auth_token;
            resolve(apiToken);
          },
          (error: any) => {
            reject(new Error(error.message));
          }
        );
    });
  }
  async getCountries() {
    let headers = new HttpHeaders();
    let token = await this.getCountriesToken();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${token}`);
    //let endpoint = "/inquiry";
    let endpoint = 'https://www.universal-tutorial.com/api/countries/';

    return new Promise((resolve, reject) => {
      this.http
        .get(endpoint, {
          headers: headers,
        })
        .subscribe(
          (data: any) => {
            resolve(data);
          },
          (error: any) => {
            reject(new Error(error.message));
          }
        );
    });
  }
  async getStates(country: string) {
    let headers = new HttpHeaders();
    let token = await this.getCountriesToken();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${token}`);
    //let endpoint = "/inquiry";
    let endpoint = `https://www.universal-tutorial.com/api/states/${country}`;

    return new Promise((resolve, reject) => {
      this.http
        .get(endpoint, {
          headers: headers,
        })
        .subscribe(
          (data: any) => {
            resolve(data);
          },
          (error: any) => {
            reject(new Error(error.message));
          }
        );
    });
  }
  async getCities(state: string) {
    let headers = new HttpHeaders();
    let token = await this.getCountriesToken();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${token}`);
    //let endpoint = "/inquiry";
    let endpoint = `https://www.universal-tutorial.com/api/cities/${state}`;

    return new Promise((resolve, reject) => {
      this.http
        .get(endpoint, {
          headers: headers,
        })
        .subscribe(
          (data: any) => {
            resolve(data);
          },
          (error: any) => {
            reject(new Error(error.message));
          }
        );
    });
  }
}
