import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFiltrosComponent } from './dialog-filtros.component';

describe('DialogFiltrosComponent', () => {
  let component: DialogFiltrosComponent;
  let fixture: ComponentFixture<DialogFiltrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogFiltrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFiltrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
