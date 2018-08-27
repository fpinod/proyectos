import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPagarComponent } from './dialog-pagar.component';

describe('DialogPagarComponent', () => {
  let component: DialogPagarComponent;
  let fixture: ComponentFixture<DialogPagarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPagarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPagarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
