import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDesPaysComponent } from './liste-des-pays.component';

describe('ListeDesPaysComponent', () => {
  let component: ListeDesPaysComponent;
  let fixture: ComponentFixture<ListeDesPaysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeDesPaysComponent]
    });
    fixture = TestBed.createComponent(ListeDesPaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
