import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleDeClaseComponent } from './detalle-de-clase.component';

describe('DetalleDeClaseComponent', () => {
  let component: DetalleDeClaseComponent;
  let fixture: ComponentFixture<DetalleDeClaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleDeClaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleDeClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
