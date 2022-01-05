import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-resetear-contrasena',
  templateUrl: './resetear-contrasena.component.html',
  styleUrls: ['./resetear-contrasena.component.scss'],
})
export class ResetearContrasenaComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {}
  async resetear() {}

  back(): void {
    this.location.back();
  }
}
