import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DetalleDePagoService } from './detalle-de-pago.service';
import {
  faPlusCircle,
  faMinusCircle,
  faSave,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-detalle-de-pago',
  templateUrl: './detalle-de-pago.component.html',
  styleUrls: ['./detalle-de-pago.component.scss'],
})
export class DetalleDePagoComponent implements OnInit {
  saveIcon = faSave;
  @Input() tipoUsuario: string = "0";
  @Output() closePago = new EventEmitter<string>();
  @Input() user:any = {};
  detallesDePago: any;
  form!: FormGroup;
  method:string = 'payu';
  type:string = '';
  data:any;
  constructor( private fb: FormBuilder, private _detallePago: DetalleDePagoService ) {}

  ngOnInit(): void {
    this.createForm();
    this.getTeacherPayment();
    console.log(this.data);
  }

  close() {
    this.closePago.emit(this.detallesDePago);
  }

  createForm(){
    this.form = this.fb.group({
      payu: this.fb.group({
        method: ['payu'],
        user_name: [''],
        identification: [''],
        merch_id: [''],
        email: [''],
        bank: [''],
        account_type: [''],
        number_account: ['']
      }),
      paypal: this.fb.group({
        method: ['paypal'],
        email: ['']
      }),
      bank: this.fb.group({
        method: ['bank'],
        account_holder: [''],
        account_type: [''],
        bank: [''],
        number_account: [''],
        description: [''],
        email: ['']
      })
    })
  }

  getTeacherPayment(){
    this._detallePago.getTeacherPayment(this.user.id)
    .subscribe( (res:any) => {
      this.data = res.result;
      this.type = this.data.method;
      this.form.get('payu')?.patchValue({
        method: 'payu',
        user_name: this.data.user_name,
        identification: this.data.identification,
        merch_id: this.data.merch_id,
        email: this.data.email,
        bank: this.data.bank,
        account_type: this.data.account_type,
        number_account: this.data.number_account
      })
      this.form.get('paypal')?.patchValue({
        method: 'paypal',
        email: this.data.email
      })
      this.form.get('bank')?.patchValue({
        method: 'bank',
        account_holder: this.data.account_holder,
        account_type: this.data.account_type,
        bank: this.data.bank,
        number_account: this.data.number_account,
        description: this.data.description,
        email: this.data.email
      })
    })
  }

  getPaymentMethod(method:string){
    this.method = method;
  }

  save(){
    let data = {}
    if (this.method == 'payu') {
      data = this.form.value.payu;
    } else if (this.method == 'paypal') {
      data = this.form.value.paypal;
    } else {
      data = this.form.value.bank;
    }
    this.data
    ?
    this._detallePago.update(data, this.user.id).subscribe(res => this.getTeacherPayment())
    :
    this._detallePago.save(data).subscribe(res => this.getTeacherPayment())
  }
}
