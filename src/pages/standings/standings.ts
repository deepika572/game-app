import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as _ from 'lodash';
import { GameapiProvider } from '../../providers/gameapi/gameapi';

@IonicPage()
@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class StandingsPage {

  public allStandings: any[];
  public standings: any[];
  public team: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public gameapi: GameapiProvider) {
  }

  ionViewDidLoad() {
    this.team = this.navParams.data;
    let tourneyData = this.gameapi.getCurrentTourney();
    this.standings = tourneyData.standings;
    this.allStandings = _.chain(this.standings)
      .groupBy('division')
      .toPairs()
      .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
      .value();

  }

}
