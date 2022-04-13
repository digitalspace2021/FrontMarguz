import { PublicService } from './../../services/public.service';
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

  profesoresList: any;
  idiomas!: any;
  page?: number;
  idiomaSelected: string = 'Todos';
  minPrice: number = 0;
  maxPrice: number = 0;
  name: string = '';

  constructor(
    public sanitizer: DomSanitizer,
    private router: Router,
    private publicService: PublicService,
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
    let data: any;
    data = {
      name_search: this.name,
      lenguage_search:
        this.idiomaSelected == 'Todos' ? '' : this.idiomaSelected,
      price_minor: this.minPrice,
      price_m: this.maxPrice,
    };
    this.publicService.searchTearcher(data).subscribe((resp: any) => {
      this.profesoresList = resp.result;
    });
  }

  abrirPerfil(id: number) {
    this.router.navigate([`public/perfil/${id}`]);
  }

  restablecerFiltros() {
    this.name = '';
    this.idiomaSelected = 'Todos';
    this.minPrice = 0;
    this.maxPrice = 0;
    this.getTeacher();
  }

  filtrarResultados() {
    this.getTeacher();
  }
}
