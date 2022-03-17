import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-clase',
  templateUrl: './editar-clase.component.html',
  styleUrls: ['./editar-clase.component.scss']
})
export class EditarClaseComponent implements OnInit {
  @Input() tipoUsuario: string = "0";

  constructor() { }

  ngOnInit(): void {
  }

}
