import { ILogin } from './../interfaces/auth.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const env = environment.host;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  address = env + 'auth/';

  constructor(private http: HttpClient) {}

  registrarTeacher(formData: FormData) {
    let endPoint = this.address + 'register/teacher';
    return new Promise((resolve, reject) => {
      this.http.post<any>(endPoint, formData).subscribe(
        (data: any) => {
          resolve(data);
        },
        (error: any) => {
          reject(new Error(error.message));
        }
      );
    });
  }

  registrarStudent(formData: FormData) {
    let endPoint = this.address + 'register/student';
    return new Promise((resolve, reject) => {
      this.http.post<any>(endPoint, formData).subscribe(
        (data: any) => {
          resolve(data);
        },
        (error: any) => {
          reject(new Error(error.message));
        }
      );
    });
  }  
  registrarAdmin(formData: FormData) {
    let endPoint = this.address + 'register/admin';
    return new Promise((resolve, reject) => {
      this.http.post<any>(endPoint, formData).subscribe(
        (data: any) => {
          resolve(data);
        },
        (error: any) => {
          reject(new Error(error.message));
        }
      );
    });
  }

  login(login: any) {
    let endPoint = this.address + 'login';
    return new Promise((resolve, reject) => {
      this.http.post<ILogin>(endPoint, login).subscribe(
        (data: any) => {
          resolve(data);
        },
        (error: any) => {
          reject(new Error(error.message));
        }
      );
    });
  }

  refresh() {
    let endPoint = this.address + 'refresh';
    return new Promise((resolve, reject) => {
      this.http.post(endPoint, {}).subscribe(
        (data: any) => {
          resolve(data);
        },
        (error: any) => {
          reject(new Error(error.message));
        }
      );
    });
  }

  isAuthenticated() {
    if (localStorage.getItem('user')) return true;
    return false;
  }

  async logout() {
    try {
      localStorage.removeItem('user');
      let token = this.getToken();
      let headers: any;
      headers = headers.append('Authorization', token);
      let endpoint = `${this.address}logout`;
      return new Promise((resolve, reject) => {
        this.http.post(endpoint, {}, {}).subscribe(
          (data) => {
            resolve(data);
          },
          (error: any) => {
            reject(new Error(error.message));
          }
        );
      });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  getToken() {
    let token = localStorage.getItem('token');
    if (token == null) {
      throw new Error('Token no existente');
    }
    return `Bearer ${token}`;
  }

  getTipoUsuario() {
    return JSON.parse(localStorage.getItem('user') as any).user.role;
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
