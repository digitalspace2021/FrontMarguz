import { Router } from '@angular/router';
import { ProfesoresService } from '../../services/profesores.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { faMoneyCheck } from '@fortawesome/free-solid-svg-icons';
import { Md5 } from 'ts-md5/dist/md5';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { environment } from 'src/environments/environment';

const env = environment;

@Component({
  selector: 'app-editar-pago',
  templateUrl: './editar-pago.component.html',
  styleUrls: ['./editar-pago.component.scss'],
})
export class EditarPagoComponent implements OnInit {
  md5 = new Md5();
  saveIcon = faMoneyCheck;
  form!: FormGroup;
  jsonUser: any;
  totalPrice: number = 0;
  accountId!: number;
  keyPayu = 'B1562m9l83uepyKjqo6ShePSeR';
  quality!: string;
  currency!: string;
  arrayUrl!: any;

  public payPalConfig?: IPayPalConfig;

  @Input() priceHour!: number;
  @Input() phone!: number;
  @Input() name!: string;

  constructor(
    private formBuilder: FormBuilder,
    private profesoresSv: ProfesoresService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let user = localStorage.getItem('user') || undefined;
    if (user) {
      this.jsonUser = JSON.parse(user);
    }
    this.buildForm();
    this.initConfig();
  }

  buildForm() {
    let nameComplete;
    if (this.jsonUser) {
      nameComplete =
        this.jsonUser.user.name + ' ' + this.jsonUser.user.lastname;
    }
    this.form = this.formBuilder.group({
      namePayu: [!nameComplete ? '' : nameComplete],
      pricePayu: [!this.priceHour ? 0 : this.priceHour],
      hourPayu: [0, Validators.min(1)],
      emailPayu: [!this.jsonUser ? '' : this.jsonUser.user.email],
      emailPaypal: [''],
      currency: ['', Validators.required],
      description: [''],
    });
  }

  selectCurrent(): void {
    let current = this.form.get('currency')!.value;
    switch (current) {
      case 'USD':
        this.accountId = 512326;
        break;
      case 'COP':
        this.accountId = 512321;
        break;
      case 'MXN':
        this.accountId = 512324;
        break;
      case 'ARS':
        this.accountId = 512322;
        break;
      case 'PEN':
        this.accountId = 512323;
        break;
      case 'BRL':
        this.accountId = 512327;
        break;
      case 'CLP':
        this.accountId = 512325;
        break;
    }
  }

  calcPrice() {
    this.totalPrice =
      parseInt(this.form.get('hourPayu')!.value) * this.priceHour;
  }

  paymentPayu() {
    let referenceCode =
      'Margus-teacher-hour-' + this.form.get('hourPayu')!.value;

    let data = {
      referenceCode: referenceCode,
      amount: this.totalPrice,
      currency: this.form.get('currency')!.value,
      buyerEmail: this.form.get('emailPayu')!.value,
      tax: 0,
      taxReturnBase: 0,
      description: this.form.get('description')!.value,
      responseUrl: environment.host + 'public',
      confirmationUrl: environment.host,
    };

    this.profesoresSv.paymentPayu(data).subscribe((resp: any) => {
      this.arrayUrl = resp.result;
      window.location.href = this.arrayUrl.url;
    });
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: this.currency,
      clientId: env.clientId,
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [this.getAmount()],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        /* actions.order.get().then(details => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });*/
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        // this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        // this.showCancel = true;
      },
      onError: (err) => {
        console.log('OnError', err);
        //  this.showError = true;
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

  getAmount() {
    this.currency = this.form.get('currency')!.value;
    this.quality = this.form.get('hourPayu')!.value;
    let priceUnit = this.form.get('pricePayu')!.value;

    return {
      amount: {
        currency_code: this.currency,
        value: this.totalPrice.toString(),
        breakdown: {
          item_total: {
            currency_code: this.currency,
            value: this.totalPrice.toString(),
          },
        },
      },
      items: [
        {
          name: 'Clases Contratadas',
          quantity: this.quality,
          unit_amount: {
            currency_code: this.currency,
            value: priceUnit.toString(),
          },
        },
      ],
    };
  }
}
