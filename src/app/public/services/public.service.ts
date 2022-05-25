import { environment } from './../../../environments/environment';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpParamsOptions,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

const env = environment.host;

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  address = env + 'admin/profile';
  addressSche = env + 'user/schedulesavailable/';

  user = localStorage.getItem('user') || undefined;

  headers!: HttpHeaders;
  TypeUser = null;

  token = localStorage.getItem('user') || '';

  httpOptions = {};

  constructor(private http: HttpClient) {
    if (this.token) {
      this.TypeUser = JSON.parse(localStorage.getItem('user') as any).user.role;
      this.httpOptions = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + JSON.parse(this.token)?.access_token,
        }),
      };
    }
  }

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
    return this.http.post(url, data);
  }

  getScheduledPublic(id: number) {
    let url = `${this.addressSche}${id}`;
    return this.http.get(url);
  }

  searchStudentPost(term: any) {
    this.generarToken();
    const httpParams: HttpParamsOptions = {
      fromObject: { search: term },
    } as HttpParamsOptions;
    const options = {
      params: new HttpParams(httpParams),
      headers: this.headers,
    };

    if (term === '') {
      return of([]);
    }
    return this.http.get<[any, string[]]>(env + 'users/students', options).pipe(
      map((response: any) => {
        return response.result;
      })
    );
  }

  searchTearcherPost(term: any) {
    this.generarToken();
    const options = { params: { search: term }, headers: this.headers };
    if (term === '') {
      return of([]);
    }
    return this.http.get<[any, string[]]>(env + 'users/teachers', options).pipe(
      map((response: any) => {
        return response.result;
      })
    );
  }

  getSchedule(term: any) {
    this.generarToken();
    if (term === '') {
      return of([]);
    }

    return this.http
      .get<[any, string[]]>(env + `user/schedulesavailable/${term}`)
      .pipe(
        map((response: any) => {
          return response.result;
        })
      );
  }

  getUsuarioTeacher(id: number) {
    let url = `${this.address}/user/${id}`;
    return this.http.get(url, { headers: this.headers });
  }

  saveClass(form: FormData, id = null) {
    let endPoint =
      id != null ? env + 'admin/lesson/update/' + id : env + 'admin/lesson';

    return new Promise((resolve, reject) => {
      this.http.post<any>(endPoint, form, this.httpOptions).subscribe(
        (data: any) => {
          resolve(data);
        },
        (error: any) => {
          reject(error.error.errors);
        }
      );
    });
  }

  getLessons() {
    let endPoint = '';
    if (this.TypeUser == 'Student')
      endPoint = env + 'student/lessons/schedules';
    if (this.TypeUser == 'Teacher')
      endPoint = env + 'teacher/lessons/schedules';

    this.generarToken();
    return new Promise((resolve, reject) => {
      this.http
        .get<any>(endPoint, { params: {}, headers: this.headers })
        .subscribe(
          (data: any) => {
            resolve(data);
          },
          (error: any) => {
            reject(error.error.errors);
          }
        );
    });
  }

  // getLessons() {
  //   let endPoint = env + 'teacher/schedules';
  //   this.generarToken();
  //   return new Promise((resolve, reject) => {
  //     this.http
  //       .get<any>(endPoint, { params: {}, headers: this.headers })
  //       .subscribe(
  //         (data: any) => {
  //           resolve(data);
  //         },
  //         (error: any) => {
  //           reject(error.error.errors);
  //         }
  //       );
  //   });
  // }

  getLessons2() {
    let endPoint = env + 'auth/user';
    this.generarToken();
    return new Promise((resolve, reject) => {
      this.http
        .get<any>(endPoint, { params: {}, headers: this.headers })
        .subscribe(
          (data: any) => {
            resolve(data);
          },
          (error: any) => {
            reject(error.error.errors);
          }
        );
    });
  }

  searchLesson2(id: number) {
    let endPoint = env + 'admin/lesson/' + id;
    this.generarToken();
    return new Promise((resolve, reject) => {
      this.http
        .get<any>(endPoint, { params: {}, headers: this.headers })
        .subscribe(
          (data: any) => {
            resolve(data);
          },
          (error: any) => {
            reject(error.error.errors);
          }
        );
    });
  }

  approveLesson(id: number) {

    this.generarToken();
    let endPoint = env + 'teacher/lesson/' + id;
    this.TypeUser = JSON.parse(localStorage.getItem('user') as any).user.role;
    if (this.TypeUser == 'Admin') endPoint = env + 'admin/lesson/' + id;


    return new Promise((resolve, reject) => {
      this.http
        .put<any>(endPoint, { params: {}, headers: this.headers })
        .subscribe(
          (data: any) => {
            resolve(data);
          },
          (error: any) => {
            reject(error.error.errors);
          }
        );
    });
  }

  searchLesson(id: number) {
    let endPoint = env + 'class/' + id;
    this.generarToken();
    return new Promise((resolve, reject) => {
      this.http
        .get<any>(endPoint, { params: {}, headers: this.headers })
        .subscribe(
          (data: any) => {
            resolve(data);
          },
          (error: any) => {
            reject(error.error.errors);
          }
        );
    });
  }

  searchschedules(id: number) {
    let endPoint = env + 'lessons/schedules/' + id;
    this.generarToken();
    return new Promise((resolve, reject) => {
      this.http
        .get<any>(endPoint, { params: {}, headers: this.headers })
        .subscribe(
          (data: any) => {
            resolve(data);
          },
          (error: any) => {
            reject(error.error.errors);
          }
        );
    });
  }
}
