import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeshabilitarComponent } from './deshabilitar.component';

describe('DeshabilitarComponent', () => {
  let component: DeshabilitarComponent;
  let fixture: ComponentFixture<DeshabilitarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeshabilitarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeshabilitarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
