import { Component, Input, OnInit } from '@angular/core';
import { DatePipe, formatNumber } from '@angular/common';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.scss'],
})
export class CronogramaComponent implements OnInit {
  @Input() tipoUsuario: string = "0";
  inicioRange?: Date;
  finRange?: Date;
  range: any;
  backRow = faChevronLeft;
  nextRow = faChevronRight;
  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.setDates(new Date());
  }
  setDates(date: Date) {
    this.inicioRange = new Date(date);
    this.finRange = new Date(this.inicioRange);
    this.finRange.setDate(this.finRange.getDate() + 6);
    this.range = [];
    for (let d = new Date(this.inicioRange); d <= this.finRange; d.setDate(d.getDate() + 1)) {
      this.range.push(new Date(d));
    }
  }
  nextRange() {
    if (this.inicioRange) {
      let date = new Date(this.inicioRange);
      date.setDate(date.getDate() + 1);
      this.setDates(date);
    }
    /*     let rangeDays: any = document.getElementsByClassName('rangeDays');
    let fiz: any = this.inicioRange;
    let fde: any = this.finRange;

    let fizParse: any = parseInt(fiz.textContent);
    fizParse = fizParse + 1;
    fizParse = fizParse.toString();
    fiz.innerHTML = fizParse;

    let fdeParse: any = parseInt(fde.textContent);
    fdeParse = fdeParse + 1;
    fdeParse = fdeParse.toString();
    fde.innerHTML = fdeParse;

    for (let i = 0; i < rangeDays.length; i++) {
      let valore = rangeDays[i].textContent;
      let valoresParse = parseInt(valore);
      valoresParse = valoresParse + 1;
      rangeDays[i].innerHTML = valoresParse;
    } */
  }

  backRange() {
    if (this.inicioRange) {
      let date = new Date(this.inicioRange);
      date.setDate(date.getDate() - 1);
      this.setDates(date);
    }
    /*     let rangeDays: any = document.getElementsByClassName('rangeDays');

    let fiz: any = this.inicioRange;
    let fde: any = this.finRange;

    let fizParse: any = parseInt(fiz.textContent);
    fizParse = fizParse - 1;
    fizParse = fizParse.toString();
    fiz.innerHTML = fizParse;

    let fdeParse: any = parseInt(fde.textContent);
    fdeParse = fdeParse - 1;
    fdeParse = fdeParse.toString();
    fde.innerHTML = fdeParse;

    for (let i = 0; i < rangeDays.length; i++) {
      let valore = rangeDays[i].textContent;
      let valoresParse = parseInt(valore);
      valoresParse = valoresParse - 1;
      rangeDays[i].innerHTML = valoresParse;
    } */
  }
}
