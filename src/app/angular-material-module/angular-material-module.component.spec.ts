import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularMaterialModuleComponent } from './angular-material-module.component';

describe('AngularMaterialModuleComponent', () => {
  let component: AngularMaterialModuleComponent;
  let fixture: ComponentFixture<AngularMaterialModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AngularMaterialModuleComponent]
    });
    fixture = TestBed.createComponent(AngularMaterialModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
