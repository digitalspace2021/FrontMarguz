import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-de-clase',
  templateUrl: './detalle-de-clase.component.html',
  styleUrls: ['./detalle-de-clase.component.scss']
})
export class DetalleDeClaseComponent implements OnInit {
  @Input() tipoUsuario: string = "0";

  constructor() { }

  ngOnInit(): void {
  }

}
