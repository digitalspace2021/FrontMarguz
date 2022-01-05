import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticasProfesorComponent } from './politicas-profesor.component';

describe('PoliticasProfesorComponent', () => {
  let component: PoliticasProfesorComponent;
  let fixture: ComponentFixture<PoliticasProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliticasProfesorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticasProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
