import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'header-estudiante',
  templateUrl: './header-estudiante.component.html',
  styleUrls: ['./header-estudiante.component.scss']
})
export class HeaderEstudianteComponent implements OnInit {
  icon = faSortDown;
  mnuActive?: number;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  menuActive(mnu: number) {
    this.mnuActive = mnu;
  }
  async logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
