import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTrainComponent } from './search-train.component';

describe('SearchTrainComponent', () => {
  let component: SearchTrainComponent;
  let fixture: ComponentFixture<SearchTrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchTrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
