import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticasPagoProfesorComponent } from './politicas-pago-profesor.component';

describe('PoliticasPagoProfesorComponent', () => {
  let component: PoliticasPagoProfesorComponent;
  let fixture: ComponentFixture<PoliticasPagoProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliticasPagoProfesorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticasPagoProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
