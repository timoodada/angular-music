import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayingListComponent } from './playing-list.component';
import {PlayerModule} from '../player.module';
import {HttpClientModule} from '@angular/common/http';

describe('PlayingListComponent', () => {
  let component: PlayingListComponent;
  let fixture: ComponentFixture<PlayingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PlayerModule,
        HttpClientModule
      ],
      declarations: []
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
