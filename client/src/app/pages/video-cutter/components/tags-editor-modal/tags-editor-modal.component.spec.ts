import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsEditorModalComponent } from './tags-editor-modal.component';

describe('TagsEditorModalComponent', () => {
  let component: TagsEditorModalComponent;
  let fixture: ComponentFixture<TagsEditorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsEditorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsEditorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
