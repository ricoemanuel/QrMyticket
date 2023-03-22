import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectorCamComponent } from './lector-cam.component';

describe('LectorCamComponent', () => {
  let component: LectorCamComponent;
  let fixture: ComponentFixture<LectorCamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LectorCamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LectorCamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
