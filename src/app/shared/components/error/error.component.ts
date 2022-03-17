import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-error",
  templateUrl: "./error.component.html",
  styleUrls: ["./error.component.scss"],
})
export class ErrorComponent implements OnInit {
  @Input() msg: string = "";
  @Input() title: string = "ERROR";
  @Output() closeError = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {
    this.msg = this.msg.replace(/^\:/, "");
  }

  close() {
    this.closeError.emit("Cerrando error");
  }
}
