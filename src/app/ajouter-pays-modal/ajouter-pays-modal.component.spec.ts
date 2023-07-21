import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterPaysModalComponent } from './ajouter-pays-modal.component';

describe('AjouterPaysModalComponent', () => {
  let component: AjouterPaysModalComponent;
  let fixture: ComponentFixture<AjouterPaysModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterPaysModalComponent]
    });
    fixture = TestBed.createComponent(AjouterPaysModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
