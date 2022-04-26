import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mensajeria',
  templateUrl: './mensajeria.component.html',
  styleUrls: ['./mensajeria.component.scss']
})
export class MensajeriaComponent implements OnInit {

  @Input() tipoMensaje: number=0;
  @Input() mensaje: string = "";

  constructor( private route : Router) { }

  ngOnInit(): void {
  }

  terminar(path: string = ''){
     this.route.navigate([path]);
  }

}
