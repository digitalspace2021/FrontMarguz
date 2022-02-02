import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleDePagoComponent } from './detalle-de-pago.component';

describe('DetalleDePagoComponent', () => {
  let component: DetalleDePagoComponent;
  let fixture: ComponentFixture<DetalleDePagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleDePagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleDePagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
