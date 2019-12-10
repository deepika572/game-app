import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GameapiProvider {

  //private baseUrl = "https://game-app-2829f.firebaseio.com/tournaments.json"
  private baseUrl = "https://test-ad30e.firebaseio.com/tournaments.json";
  private currentTourney: any = {}
  constructor(public http: Http) {
  }

  getTournaments() {
    return new Promise((resolve) => {
      this.http.get(this.baseUrl).map(res => res.json()).
        subscribe(data => resolve(data))
    });
  }

  getTournamentsData(tourneyId): Observable<any> {
    return this.http.get(`https://test-ad30e.firebaseio.com/tournaments-data/${tourneyId}.json`)
      .map(response => {
        this.currentTourney = response.json();
        return this.currentTourney;
      });
  }
}
