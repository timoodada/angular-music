import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingersComponent } from './singers.component';
import {SingersRoutingModule} from './singers-routing.module';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('SingersComponent', () => {
  let component: SingersComponent;
  let fixture: ComponentFixture<SingersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SingersRoutingModule,
        HttpClientModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientJsonpModule
      ],
      declarations: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
