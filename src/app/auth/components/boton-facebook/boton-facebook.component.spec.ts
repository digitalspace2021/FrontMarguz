import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonFacebookComponent } from './boton-facebook.component';

describe('BotonFacebookComponent', () => {
  let component: BotonFacebookComponent;
  let fixture: ComponentFixture<BotonFacebookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotonFacebookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonFacebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
