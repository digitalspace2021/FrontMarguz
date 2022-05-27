import { Component, OnInit, ViewChild } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { CronogramaAdminComponent } from 'src/app/shared/components/cronograma-admin/cronograma-admin.component';
import { CronogramaComponent } from 'src/app/shared/components/cronograma/cronograma.component';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
})

export class CalendarioComponent implements OnInit {
  flechaIzquierda = faChevronLeft;
  flechaDerecha = faChevronRight;
  constructor() { }

  fecha?: Date | null;
  @ViewChild(CronogramaComponent) modal!: CronogramaComponent

  ngOnInit(): void {
    this.fecha = new Date();
    this.modal?.setDates(this.fecha)
  }

  onSelect($e: any) {
    console.log($e);
    this.modal.setDates($e)
  }

}
