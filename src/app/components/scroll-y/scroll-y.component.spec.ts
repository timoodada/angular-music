import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollYComponent } from './scroll-y.component';

describe('ScrollYComponent', () => {
  let component: ScrollYComponent;
  let fixture: ComponentFixture<ScrollYComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollYComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollYComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
