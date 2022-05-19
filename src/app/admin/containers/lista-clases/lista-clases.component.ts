import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faMinusCircle,
  faPlusCircle,
  faSortDown,
  faVrCardboard,
} from '@fortawesome/free-solid-svg-icons';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ClassService } from '../../services/class.service';

@Component({
  selector: 'app-lista-clases',
  templateUrl: './lista-clases.component.html',
  styleUrls: ['./lista-clases.component.scss'],
})
export class ListaClasesComponent implements OnInit {
  clases: Array<any> = []

  // [
  // {
  //   id: 0,
  //   profesor: 'xxxxxx',
  //   hora: '10:00',
  //   fecha: '20/10/2021',
  //   estado: 'Realizada',
  //   cantidad: 1,
  // },
  // {
  //   id: 0,
  //   profesor: 'xxxxxx',
  //   hora: '10:00',
  //   fecha: '20/10/2021',
  //   estado: 'PostPuesta',
  //   cantidad: 0,
  // },
  // {
  //   id: 0,
  //   profesor: 'xxxxxx',
  //   hora: '10:00',
  //   fecha: '20/10/2021',
  //   estado: 'Realizada',
  //   cantidad: 2,
  // },
  // {
  //   id: 0,
  //   profesor: 'xxxxxx',
  //   hora: '10:00',
  //   fecha: '20/10/2021',
  //   estado: 'PostPuesta',
  //   cantidad: 0,
  // },
  // ];

  icon = faSortDown;
  user = faUserCheck;
  minus = faMinusCircle;
  add = faPlusCircle;
  close = faWindowClose;
  edit = faEdit;
  trash = faTrashAlt;
  car = faVrCardboard;

  tempList: Array<any> = [];
  constructor(private router: Router, private service: ClassService) { }

  ngOnInit(): void {
    this.getClassList();
  }

  getClassList() {
    this.service.getClassList().subscribe((resp: any) => this.clases = resp.result.data);
  }

  createClass() {
    this.router.navigate(['admin/class-create']);

  }

  editClass() {
    console.log(this.tempList[0]);
    this.router.navigate(['admin/class-create'], { queryParams: { id: this.tempList[0] }, queryParamsHandling: 'merge' });
  }

  deleteClass() {
    console.log(this.tempList[0]);
    this.service.deleteClass(this.tempList[0]).subscribe((resp: any) => console.log(resp));
  }

  addClass(event: any) {

    let id: string = event.target.value;
    let tempList: Array<any> = [];

    if (event.target.checked) this.tempList.push(id)
    if (!event.target.checked) {
      tempList = this.tempList.filter(data => data != id)
      this.tempList = tempList
    }

  }

  onlyUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
  }

}
