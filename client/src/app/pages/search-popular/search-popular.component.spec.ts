import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPopularComponent } from './search-popular.component';

describe('VideoListForReviewComponent', () => {
  let component: SearchPopularComponent;
  let fixture: ComponentFixture<SearchPopularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPopularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
