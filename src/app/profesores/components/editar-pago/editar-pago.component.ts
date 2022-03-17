import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faPlusCircle, faMinusCircle, faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-editar-pago',
  templateUrl: './editar-pago.component.html',
  styleUrls: ['./editar-pago.component.scss']
})
export class EditarPagoComponent implements OnInit {
  saveIcon = faSave;
  @Output() closePago = new EventEmitter<string>();
  detallesDePago: any;
  constructor() { }

  ngOnInit(): void {
  }
  close(){
    this.closePago.emit(this.detallesDePago)
  }

}
