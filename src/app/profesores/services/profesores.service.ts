import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfesoresService {
  urlTest = 'https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/';
  urlProd = 'https://checkout.payulatam.com/ppp-web-gateway-payu/';

  constructor(private http: HttpClient) {}

  paymentPayu(data: any) {
    return this.http.post(this.urlTest, data);
  }
}
