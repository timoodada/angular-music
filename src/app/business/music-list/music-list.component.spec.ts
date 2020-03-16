import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicListComponent } from './music-list.component';
import {MusicListModule} from './music-list.module';
import {HttpClientModule} from '@angular/common/http';

describe('MusicListComponent', () => {
  let component: MusicListComponent;
  let fixture: ComponentFixture<MusicListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MusicListModule,
        HttpClientModule
      ],
      declarations: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
