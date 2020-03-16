import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterAnimationComponent } from './router-animation.component';
import {RouterAnimationModule} from './router-animation.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('AnimationComponent', () => {
  let component: RouterAnimationComponent;
  let fixture: ComponentFixture<RouterAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterAnimationModule,
        BrowserAnimationsModule
      ],
      declarations: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
