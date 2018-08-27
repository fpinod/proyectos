import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDocumentosComponent } from './dialog-documentos.component';

describe('DialogDocumentosComponent', () => {
  let component: DialogDocumentosComponent;
  let fixture: ComponentFixture<DialogDocumentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDocumentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
