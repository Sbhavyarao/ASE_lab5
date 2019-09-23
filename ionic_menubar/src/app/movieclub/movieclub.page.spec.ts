import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MovieclubPage } from './movieclub.page';
import {LoginPage} from '../login/login.page';

describe('MovieclubPage', () => {
  let component: MovieclubPage;
  let fixture: ComponentFixture<MovieclubPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ MovieclubPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieclubPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a Title', async () => {
    fixture = await TestBed.createComponent(MovieclubPage);
    await fixture.detectChanges();
    const login = fixture.nativeElement;
    const link = login.querySelectorAll('ion-title');
    expect(link[0].innerHTML).toContain('The Movie Club');
  });
});
