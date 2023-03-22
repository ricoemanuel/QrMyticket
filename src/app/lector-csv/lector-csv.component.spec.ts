import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectorCSVComponent } from './lector-csv.component';

describe('LectorCSVComponent', () => {
  let component: LectorCSVComponent;
  let fixture: ComponentFixture<LectorCSVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LectorCSVComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LectorCSVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
