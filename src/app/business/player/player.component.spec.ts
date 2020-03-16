import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerComponent } from './player.component';
import {PlayerModule} from './player.module';
import {HttpClientModule} from '@angular/common/http';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;

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
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
