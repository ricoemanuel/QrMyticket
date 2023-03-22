import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectorbdComponent } from './lectorbd.component';

describe('LectorbdComponent', () => {
  let component: LectorbdComponent;
  let fixture: ComponentFixture<LectorbdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LectorbdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LectorbdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
