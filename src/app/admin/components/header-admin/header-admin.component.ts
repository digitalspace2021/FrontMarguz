import { Component, Input, OnInit } from '@angular/core';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss'],
})
export class HeaderAdminComponent implements OnInit {
  icon = faSortDown;
  mnuActive?: number;

  constructor() {}

  ngOnInit(): void {}

  menuActive(mnu: number) {
    this.mnuActive = mnu;
  }
}
