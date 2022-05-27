import { PublicService } from 'src/app/public/services/public.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfesoresService } from '../../services/profesores.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { faMoneyCheck, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { Md5 } from 'ts-md5/dist/md5';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { environment } from 'src/environments/environment';
import { global } from 'src/environments/global';

const env = environment;

@Component({
  selector: 'app-editar-pago',
  templateUrl: './editar-pago.component.html',
  styleUrls: ['./editar-pago.component.scss'],
})
export class EditarPagoComponent implements OnInit {
  md5 = new Md5();
  saveIcon = faMoneyCheck;
  minusIcon = faMinusCircle;

  form!: FormGroup;
  jsonUser: any;
  totalPrice: number = 0;
  accountId!: number;
  quality!: string;
  currency!: string;
  arrayUrl!: any;
  arrayIntere!: any;
  id: number = 0;
  horarios: Array<any> = [];
  data: any;

  public currentUSer: any = JSON.parse(localStorage.getItem('user') as any).user
    .role;
  public hours = global.hours;
  public payPalConfig?: IPayPalConfig;

  constructor(
    private formBuilder: FormBuilder,
    private profesoresSv: ProfesoresService,
    private actRoute: ActivatedRoute,
    private publicsv: PublicService,
    private router: Router
  ) {
    this.actRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.buildForm();
    this.initConfig();
  }

  async buildForm() {
    if (this.id) {
      this.publicsv.getUsuarioTeacher(this.id).subscribe((data: any) => {
        try {
          let nameComplete;
          let user = localStorage.getItem('user') || undefined;
          if (user) {
            this.jsonUser = JSON.parse(user);
            nameComplete =
              this.jsonUser.user.name + ' ' + this.jsonUser.user.lastname;
          }
          this.data = data.result;
          this.arrayIntere = this.data.acount.languajes;

          this.form = this.formBuilder.group({
            namePayu: [!nameComplete ? '' : nameComplete],
            pricePayu: [!this.data.acount.price ? 0 : this.data.acount.price],
            hourPayu: [0, Validators.min(1)],
            emailPayu: [!this.jsonUser ? '' : this.jsonUser.user.email],
            emailPaypal: [''],
            currency: ['', Validators.required],
            description: [''],
          });
        } catch (error) {
          console.log(error);
        }
      });
    } else {
      this.router.navigate(['']);
    }
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
      parseInt(this.form.get('hourPayu')!.value) * this.data.acount.price;
  }

  paymentPayu() {
    let referenceCode =
      'Margus-' + this.form.get('hourPayu')!.value + '-' + Math.random();

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

  eliminarHorario(e: Event, index: number) {
    this.horarios.splice(index, 1);
    this.calcPrice();
  }
}
