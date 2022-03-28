import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-registro-modal',
  templateUrl: './registro-modal.component.html',
  styleUrls: ['./registro-modal.component.scss'],
})
export class RegistroModalComponent implements OnInit {
  @Input() tipoUsuario: string = "Admin";
  @Input() data: any;
  @Output() completarRegistro = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.data);
  }

  registrar(usuario: any) {
    this.completarRegistro.emit(usuario);
  }

  close() {
    this.closeModal.emit();
  }
}
