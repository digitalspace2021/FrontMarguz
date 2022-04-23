import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const host = environment.host;

@Injectable({
  providedIn: 'root',
})
export class ProfesoresService {
  urlTest = 'https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/';
  urlProd = 'https://checkout.payulatam.com/ppp-web-gateway-payu/';

  urlPaypal = host + 'paypal/pay';

  constructor(private http: HttpClient) {}

  paymentPayu(data: any) {
    return this.http.post(this.urlTest, data);
  }

  paymentPaypal(data: any) {
    return this.http.post(this.urlPaypal, data);
  }
}
