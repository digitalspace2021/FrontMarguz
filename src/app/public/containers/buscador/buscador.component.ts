import { environment } from 'src/environments/environment';
import { MateriaService } from './../../../admin/services/materia.service';
import { UsuarioService } from './../../../admin/services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})
export class BuscadorComponent implements OnInit {
  public host = environment.hostImg;

  profesores: any;
  profesoresList: any;
  idiomas!: any;

  idiomaSelected: string = 'Todos';
  minPrice: number = 0;
  maxPrice: number = 100000;
  name: string = '';

  constructor(
    public sanitizer: DomSanitizer,
    private router: Router,
    private userService: UsuarioService,
    private materiaSv: MateriaService
  ) {}

  ngOnInit(): void {
    this.getIntereses();
    this.getTeacher();
  }

  getIntereses() {
    /*************Consulta los intereses
     * Return @Array
     * Params @Null
     * *****************/
    this.materiaSv.listInteresOrLenguages().subscribe((resp) => {
      this.idiomas = resp.result;
      this.idiomas.unshift({ id: 0, name: 'Todos' });
    });
  }

  getTeacher() {
    this.userService.listUsuarioTeacher().subscribe((resp: any) => {
      this.profesores = resp.result.data;
      this.profesoresList = [...this.profesores];
    });
  }

  abrirPerfil(id: number) {
    this.router.navigate([`public/perfil/${id}`]);
  }

  restablecerFiltros() {
    this.profesoresList = this.profesores;
  }

  filtrarResultados() {
    debugger;
    if (this.idiomaSelected != 'Todos') {
      this.profesoresList = this.profesores.filter((profesor: any) => {
        if (
          profesor.languages.includes(
            (resp: any) => resp.name === this.idiomaSelected
          ) &&
          parseInt(profesor.price) <= this.maxPrice &&
          parseInt(profesor.price) >= this.minPrice &&
          profesor.name.includes(this.name)
        ) {
          return true;
        }
        return false;
      });
    } else {
      this.restablecerFiltros();
    }
  }
}
