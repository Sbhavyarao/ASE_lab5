import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmotiondetectionPage } from './emotiondetection.page';
import {MovieclubPage} from '../movieclub/movieclub.page';

describe('EmotiondetectionPage', () => {
  let component: EmotiondetectionPage;
  let fixture: ComponentFixture<EmotiondetectionPage>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ EmotiondetectionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(EmotiondetectionPage);
    component = fixture.componentInstance;
    component.checkEmotion();
    fixture.detectChanges();
  });
  it('should have a Title', async () => {
    fixture = await TestBed.createComponent(EmotiondetectionPage);
    await fixture.detectChanges();
    const login = fixture.debugElement.nativeElement
    const link = login.querySelectorAll('ion-title');
    expect(link[0].innerHTML).toContain('Emotion Detection');
  });
});
