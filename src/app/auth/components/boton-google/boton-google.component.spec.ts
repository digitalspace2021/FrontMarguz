import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonGoogleComponent } from './boton-google.component';

describe('BotonGoogleComponent', () => {
  let component: BotonGoogleComponent;
  let fixture: ComponentFixture<BotonGoogleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotonGoogleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
