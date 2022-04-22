import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
  @Input() msg: string = '';
  @Input() title: string = '';
  @Input() buttonMsg: string = '';
  @Input() logo: string = '';

  @Output() closeConfirm = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {
    this.msg = this.msg.replace(/^\:/, '');
  }

  close() {
    this.closeConfirm.emit('Cerrando confimación');
  }
}
