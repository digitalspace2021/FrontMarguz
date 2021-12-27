import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarMateriaComponent } from './borrar-materia.component';

describe('BorrarMateriaComponent', () => {
  let component: BorrarMateriaComponent;
  let fixture: ComponentFixture<BorrarMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrarMateriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
