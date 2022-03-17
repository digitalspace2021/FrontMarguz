import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PublicService } from '../../services/public.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})
export class BuscadorComponent implements OnInit {
  profesores: any;
  profesoresList: any;
  idiomas: any;

  idiomaSelected: string = 'Inglés';
  minPrice: number = 0;
  maxPrice: number = 100000;
  name: string = '';

  constructor(
    private publicService: PublicService,
    public sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {
    /*     this.publicService.getIdiomas().subscribe((data: any) => {
      try {
        this.idiomas = data;
      } catch (error) {}
    });
    this.publicService.getProfesores().subscribe((data: any) => {
      try {
        this.profesores = data;
      } catch (error) {}
    }); */
    this.idiomas = [
      'Español',
      'Inglés',
      'Portugués',
      'Francés',
      'Alemán',
      'Italiano',
      'Japonés',
    ];
    this.profesores = [
      {
        id: 1,
        nombre: 'Alejandra Gonzalez',
        pais: 'Colombia',
        valor: 50000,
        idiomas: ['Español', 'Inglés'],
        habla: ['Español nativo', 'Inglés fluido'],
        link: 'https://www.youtube.com/embed/idn6ssYRS0I',
        numeroDeClases: 58,
        descripcion:
          ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore culpa maxime voluptatibus, dignissimos inventore doloremque numquam impedit in iusto nulla ',
      },
      {
        id: 2,
        nombre: 'Fabiola León',
        pais: 'Colombia',
        valor: 20000,
        idiomas: ['Inglés', 'Alemán'],
        habla: ['Inglés', 'Alemán fluido'],
        link: 'https://www.youtube.com/embed/idn6ssYRS0I',
        numeroDeClases: 45,
        descripcion:
          ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore culpa maxime voluptatibus, dignissimos inventore doloremque numquam impedit in iusto nulla ',
      },
      {
        id: 3,
        nombre: 'Daniela Rodriguez',
        pais: 'Colombia',
        valor: 70000,
        idiomas: ['Japonés', 'Italiano'],
        habla: ['Italiano nativo', 'Japonés fluido'],
        numeroDeClases: 60,
        link: 'https://www.youtube.com/embed/idn6ssYRS0I',
        descripcion:
          ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore culpa maxime voluptatibus, dignissimos inventore doloremque numquam impedit in iusto nulla ',
      },
    ];
    this.profesoresList = [...this.profesores];
  }
  abrirPerfil(id: number) {
    this.router.navigate([`perfil/${id}`]);
  }

  restablecerFiltros(){
    this.profesoresList = this.profesores;
  }

  filtrarResultados() {
    this.profesoresList = this.profesores.filter((profesor: any) => {
      if (
        profesor.idiomas.includes(this.idiomaSelected) &&
        parseInt(profesor.valor) <= this.maxPrice &&
        parseInt(profesor.valor) >= this.minPrice &&
        profesor.nombre.includes(this.name)
      ) {
        return true;
      }
      return false;
    });
  }
}
