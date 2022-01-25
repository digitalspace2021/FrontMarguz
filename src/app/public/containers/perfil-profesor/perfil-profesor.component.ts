import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicService } from '../../services/public.service';

@Component({
  selector: 'app-perfil-profesor',
  templateUrl: './perfil-profesor.component.html',
  styleUrls: ['./perfil-profesor.component.scss'],
})
export class PerfilProfesorComponent implements OnInit {
  profesor: any;
  id: number = 0;
  constructor(private publicService: PublicService, 
    private actRoute: ActivatedRoute,
    ) {
      this.actRoute.params.subscribe((params) => {
        this.id = params["id"];
      });
  
    }

  ngOnInit(): void {
    /*this.publicService.getProfesor(this.id).subscribe((data: any) => {
      try {
        this.profesor = data;
      } catch (error) {}
    }); */
    this.profesor = {
      id: 2,
      nombre: 'Alejandra Gonzalez',
      slogan: '¡Atrevete a aprender inglés!',
      pais: 'Colombia',
      valor: 50000,
      idiomas: ['Español', 'Inglés'],
      habla: ['Español nativo', 'Inglés fluido'],
      descripcion:
        ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore culpa maxime voluptatibus, dignissimos inventore doloremque numquam impedit in iusto nulla ',
    };
  }
}
