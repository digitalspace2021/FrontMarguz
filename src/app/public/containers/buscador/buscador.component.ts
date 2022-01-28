import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PublicService } from '../../services/public.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})
export class BuscadorComponent implements OnInit {
  profesores: any;
  idiomas: any;

  constructor(private publicService: PublicService, public sanitizer:DomSanitizer) {}

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
  }
}
