import { Component, Input, OnInit } from '@angular/core';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header-auth',
  templateUrl: './header-auth.component.html',
  styleUrls: ['./header-auth.component.scss'],
})
export class HeaderAuthComponent implements OnInit {
  icon = faSortDown;
  mnuActive?: number;

  constructor() {}

  ngOnInit(): void {}

  menuActive(mnu: number) {
    this.mnuActive = mnu;
  }
}
