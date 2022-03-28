import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const env = environment.host + 'users';;

@Injectable({
    providedIn: 'root',
})
export class UserService {

    constructor(private http: HttpClient) { }

    getToken() {
        let token = localStorage.getItem('token');
        if (token == null) {
            throw new Error('Token no existente');
        }
        return `Bearer ${token}`;
    }

    async getDataForUdate() {

        let headers = new HttpHeaders();
        let endpoint = env;

        return new Promise((resolve, reject) => {
            this.http
                .get(endpoint, {
                    headers: headers,
                })
                .subscribe(
                    (data) => {
                        console.log(data);
                        resolve(data);
                    },
                    (error: any) => {
                        reject(new Error(error.message));
                    }
                );
        });
    }

}
