import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  detallesDePago: any;
  constructor() {}

  ngOnInit(): void {}
  close() {
    this.closePago.emit(this.detallesDePago);
  }
}