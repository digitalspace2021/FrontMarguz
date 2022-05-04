import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const host = environment.host;

@Injectable({
  providedIn: 'root',
})
export class ProfesoresService {
  headers!: HttpHeaders;

  urlTest = 'https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/';
  urlProd = 'https://checkout.payulatam.com/ppp-web-gateway-payu/';

  urlPaypal = host + 'paypal/pay';
  urlPayu = host + 'pay/payu';

  constructor(private http: HttpClient) {}

  paymentPayu(data: any) {
    this.headers = new HttpHeaders({
      accessControlAllowOrigin: '*',
    });
    return this.http.post(this.urlPayu, data, { headers: this.headers });
  }

  paymentPaypal(data: any) {
    return this.http.post(this.urlPaypal, data);
  }
}
