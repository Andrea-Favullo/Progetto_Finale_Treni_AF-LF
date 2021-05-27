import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteDictionaryComponent } from './route-dictionary.component';

describe('RouteDictionaryComponent', () => {
  let component: RouteDictionaryComponent;
  let fixture: ComponentFixture<RouteDictionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteDictionaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
