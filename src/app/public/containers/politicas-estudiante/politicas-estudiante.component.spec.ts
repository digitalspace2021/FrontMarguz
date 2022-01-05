import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticasEstudianteComponent } from './politicas-estudiante.component';

describe('PoliticasEstudianteComponent', () => {
  let component: PoliticasEstudianteComponent;
  let fixture: ComponentFixture<PoliticasEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliticasEstudianteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticasEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
