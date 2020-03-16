import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSongComponent } from './add-song.component';
import {AddSongModule} from './add-song.module';
import {HttpClientModule} from '@angular/common/http';

describe('AddSongComponent', () => {
  let component: AddSongComponent;
  let fixture: ComponentFixture<AddSongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AddSongModule,
        HttpClientModule
      ],
      declarations: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
