import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayingListComponent } from './playing-list.component';

describe('PlayingListComponent', () => {
  let component: PlayingListComponent;
  let fixture: ComponentFixture<PlayingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
