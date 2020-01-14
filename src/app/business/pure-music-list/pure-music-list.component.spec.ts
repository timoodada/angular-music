import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PureMusicListComponent } from './pure-music-list.component';

describe('PureMusicListComponent', () => {
  let component: PureMusicListComponent;
  let fixture: ComponentFixture<PureMusicListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PureMusicListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PureMusicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
