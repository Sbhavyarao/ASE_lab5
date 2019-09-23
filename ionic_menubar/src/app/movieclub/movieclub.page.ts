import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as firebase from 'firebase';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

@Component({
    selector: 'app-movieclub',
    templateUrl: './movieclub.page.html',
    styleUrls: ['./movieclub.page.scss'],
})
export class MovieclubPage implements OnInit {
    path = firebase.database().ref('movieHistory/');
    public movieList: any;
    public showHistory: boolean;
    constructor(private httpClient: HttpClient , private textToSpeech: TextToSpeech) {
        this.showHistory = true;
        this.path.orderByChild('Name').equalTo(firebase.auth().currentUser.email).on('value', (snapshot) => {
            this.movieList = [];
            snapshot.forEach((child) => {
                console.log(child.key, child.val());
                this.movieList.push(child.val());
                console.log('movieList: ', this.movieList);
            });
        });
    }
    public searchedMovie;
    public movieDetails;
    public movieData;
    ngOnInit() {
    }
    getMovieData() {
        this.textToSpeech.speak('Hello you searched for' + this.searchedMovie)
            .then(() => console.log('Success'))
            .catch((reason: any) => console.log(reason));
        this.showHistory = false;
        this.httpClient.get('https://cors-anywhere.herokuapp.com/' +
            'https://api.themoviedb.org/3/search/movie?api_key=79d0f381ad0a8b1c3fb900afef69ee6c&query=' + this.searchedMovie)
            .subscribe(data => {
                this.movieDetails = data;
                this.movieData = this.movieDetails.results.slice(0, 5);
                console.log(this.movieData);
            });
        firebase.database().ref('movieHistory/').push({Name: firebase.auth().currentUser.email, Value: this.searchedMovie});
    }
    getHistoryMovieData(movie) {
        this.textToSpeech.speak('Hello you searched for' + this.searchedMovie)
            .then(() => console.log('Success'))
            .catch((reason: any) => console.log(reason));
        this.showHistory = false;
        this.httpClient.get('https://cors-anywhere.herokuapp.com/' +
            'https://api.themoviedb.org/3/search/movie?api_key=79d0f381ad0a8b1c3fb900afef69ee6c&query=' + movie)
            .subscribe(data => {
                this.movieDetails = data;
                this.movieData = this.movieDetails.results.slice(0, 5);
                console.log(this.movieData);
            });
    }
}

