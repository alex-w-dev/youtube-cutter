import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticModalWrapperComponent } from './static-modal-wrapper.component';

describe('StaticModalWrapperComponent', () => {
  let component: StaticModalWrapperComponent;
  let fixture: ComponentFixture<StaticModalWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticModalWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticModalWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
