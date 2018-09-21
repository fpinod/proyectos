import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCarroComponent } from './dialog-carro.component';

describe('DialogCarroComponent', () => {
  let component: DialogCarroComponent;
  let fixture: ComponentFixture<DialogCarroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCarroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCarroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
