import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchListComponent } from './search-list.component';
import {SearchListModule} from './search-list.module';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';

describe('SearchListComponent', () => {
  let component: SearchListComponent;
  let fixture: ComponentFixture<SearchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SearchListModule,
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
