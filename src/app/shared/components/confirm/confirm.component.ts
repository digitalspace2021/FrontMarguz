import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  @Input() msg: string = "";
  @Input() title: string = "CONFIRMACÓN";
  @Output() closeError = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {
    this.msg = this.msg.replace(/^\:/, "");
  }

  close() {
    this.closeError.emit("Cerrando confimación");
  }
}
