import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-emotiondetection',
  templateUrl: './emotiondetection.page.html',
  styleUrls: ['./emotiondetection.page.scss'],
})
export class EmotiondetectionPage implements OnInit {

  constructor(private httpClient: HttpClient) { }
  public searchItem;
  public emotionResult;
  public progress;
  ngOnInit() {
  }
  checkEmotion() {
    this.httpClient.get('https://cors-anywhere.herokuapp.com/' +
        'https://api.uclassify.com/v1/uClassify/Sentiment/classify/?readKey=YGzIEYAJW6Q4&text=' + this.searchItem)
        .subscribe(data => {
          // @ts-ignore
          if (data.negative < data.positive) {
            this.emotionResult = 'Positive';
            // @ts-ignore
            this.progress = data.positive;
          }
          // @ts-ignore
          if (data.negative > data.positive) {
            this.emotionResult = 'Negative';
            // @ts-ignore
            this.progress = data.negative;
          }
        });
  }
}

