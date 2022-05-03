import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DetalleDePagoService } from './detalle-de-pago.service';
import { UsuarioService } from '../../../admin/services/usuario.service';
import {
  faPlusCircle,
  faMinusCircle,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';

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
  id:any;
  urlId:any;
  dataUsuario:any;
  role:any;
  @ViewChild('ModalClose') ModalClose?: ElementRef;
  isRegistroExitoso: boolean = false;
  constructor(
              private fb: FormBuilder,
              private _detallePago: DetalleDePagoService,
              private _user: UsuarioService,
              private location: Location
             ) {}

  ngOnInit(): void {
    this.urlId = new URL(location.href).searchParams.get('id');
    this.dataUsuario = localStorage.getItem('user');
    this.dataUsuario = JSON.parse(this.dataUsuario);
    this.role = this.dataUsuario?.user?.role;
    this.getUser();
    this.createForm();
    this.getTeacherPayment();
  }

  getUser(){
    if (this.role == 'Admin') {
      this._user.getUsuario(this.urlId)
      .subscribe( (res:any) => {
        this.id = res.result.id;
      })
    } else {
      this._user.getUsuario()
      .subscribe( (res:any) => {
        this.id = res.result.id;
      })
    }
  }

  close() {
    this.closePago.emit(this.detallesDePago);
  }

  createForm(){
    this.form = this.fb.group({
      payu: this.fb.group({
        method: ['payu'],
        user_name_payu: [''],
        identification_payu: [''],
        //merch_id: [''],
        email_payu: ['', Validators.email],
        bank_payu: [''],
        account_type_payu: [''],
        number_account_payu: ['']
      }),
      paypal: this.fb.group({
        method: ['paypal'],
        email_paypal: ['', Validators.email]
      }),
      bank: this.fb.group({
        method: ['bank'],
        user_name_bank: [''],
        account_type_bank: [''],
        bank: [''],
        number_account_bank: [''],
        description_bank: [''],
        email_bank: ['', Validators.email]
      })
    })
  }

  getTeacherPayment(){
    setTimeout(() => {
      this._detallePago.getTeacherPayment((this.role == 'Admin' ? this.urlId : this.id))
      .subscribe( (res:any) => {
        this.data = res.result;
        this.type = this.data.method;
        this.form.get('payu')?.patchValue({
          method: 'payu',
          user_name_payu: this.data.user_name_payu,
          identification_payu: this.data.identification_payu,
          merch_id: this.data.merch_id,
          email_payu: this.data.email_payu,
          bank_payu: this.data.bank_payu,
          account_type_payu: this.data.account_type_payu,
          number_account_payu: this.data.number_account_payu
        })
        this.form.get('paypal')?.patchValue({
          method: 'paypal',
          email_paypal: this.data.email_paypal
        })
        this.form.get('bank')?.patchValue({
          method: 'bank',
          user_name_bank: this.data.user_name_bank,
          account_type_bank: this.data.account_type_bank,
          bank: this.data.bank,
          number_account_bank: this.data.number_account_bank,
          description_bank: this.data.description_bank,
          email_bank: this.data.email_bank
        })
      })
    }, 500);
  }

  openConfirmRegistro() {
    this.isRegistroExitoso = true;
 }
  closeConfirmRegistro() {
    this.isRegistroExitoso = false;
    this.closePago.emit(this.detallesDePago);

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
    this._detallePago.update(data, (this.role == 'Admin' ? this.urlId : this.id)).subscribe(res => {
      this.getTeacherPayment();
      this.isRegistroExitoso = true;
    })
  }
}
