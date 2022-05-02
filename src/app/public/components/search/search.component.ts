import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Observable, of, OperatorFunction, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';
import { PublicService } from '../../services/public.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [PublicService]
})
export class SearchComponent implements OnInit {

  searching = false;
  searchFailed = false;
  searchingProcedure = false;
  searchFailedProcedure: boolean = false;
  serviceSelected: any;
  methodSelected: any;

  @Input('method') method: number = 0
  @Input('model') model: any = {}
  @Output() prop = new EventEmitter<string>();
  @Output() price = new EventEmitter<string>();



  constructor(private service: PublicService) { }

  ngOnInit(): void { }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap((term: any) =>
        this.function(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))

      ),
      tap(() => this.searching = false),
    )

  InputSearch = (x: { name: string, lastname: string }) => {
    return x.name + ' ' + x.lastname
  };

  function(term: string) {
    let methods = [
      this.service.searchTearcherPost(term),
      this.service.searchStudentPost(term),
    ]
    return methods[this.method];
  }

  selectedItem($e: any) {
    this.prop.emit($e?.item?.id)
    this.price.emit($e?.item)
  }

}
