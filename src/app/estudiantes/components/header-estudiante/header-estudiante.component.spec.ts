import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderEstudianteComponent } from './header-estudiante.component';

describe('HeaderEstudianteComponent', () => {
  let component: HeaderEstudianteComponent;
  let fixture: ComponentFixture<HeaderEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderEstudianteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
