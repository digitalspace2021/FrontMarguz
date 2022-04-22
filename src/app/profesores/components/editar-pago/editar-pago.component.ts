import { ProfesoresService } from '../../services/profesores.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { faMoneyCheck } from '@fortawesome/free-solid-svg-icons';
import { Md5 } from 'ts-md5/dist/md5';

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
  @Input() priceHour!: number;
  @Input() phone!: number;
  @Input() name!: number;

  constructor(
    private formBuilder: FormBuilder,
    private profesoresSv: ProfesoresService
  ) {}

  ngOnInit(): void {
    let user = localStorage.getItem('user') || undefined;
    if (user) {
      this.jsonUser = JSON.parse(user);
    }
    this.buildForm();
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
      currency: ['USD', Validators.required],
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

    let signature = this.md5
      .appendStr(
        this.keyPayu +
          '508029' +
          referenceCode +
          this.totalPrice +
          this.form.get('currency')!.value
      )
      .end();

    let data = {
      merchantId: 508029,
      accountId: this.accountId,
      signature: signature,
      referenceCode: referenceCode,
      amount: this.totalPrice,
      currency: this.form.get('currency')!.value,
      buyerEmail: this.form.get('emailPayu')!.value,
      tax: 0,
      taxReturnBase: 0,
      test: 0,
      telephone: this.phone,
      buyerFullName: this.name,
    };
    console.log(data);
    this.profesoresSv.paymentPayu(data).subscribe((resp) => {
      console.log(resp);
    });
  }

  paymentPaypal() {}
}
