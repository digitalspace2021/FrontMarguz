import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
})
export class CalendarioComponent implements OnInit {
  flechaIzquierda = faChevronLeft;
  flechaDerecha = faChevronRight;
  constructor() { }

  ngOnInit(): void {
    /* 
    $('.datepicker').datepicker({
      prevText:
        '<i class="fa fa-fw fa-angle-left" style="color:#E31B36;font-size:14px"></i>',
      nextText:
        '<i class="fa fa-fw fa-angle-right" style="color:#E31B36;font-size:14px"></i>',
      monthNames: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ],
      monthNamesShort: [
        'Ene',
        'Feb',
        'Mar',
        'Abr',
        'May',
        'Jun',
        'Jul',
        'Ago',
        'Sep',
        'Oct',
        'Nov',
        'Dic',
      ],
      dayNames: [
        'domingo',
        'lunes',
        'martes',
        'Miércoles',
        'jueves',
        'viernes',
        'Sábado',
      ],
      dayNamesShort: ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'],
      dayNamesMin: ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'],
    });
  */



  }
}
