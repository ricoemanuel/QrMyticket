import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioEntradaComponent } from './formulario-entrada.component';

describe('FormularioEntradaComponent', () => {
  let component: FormularioEntradaComponent;
  let fixture: ComponentFixture<FormularioEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioEntradaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
