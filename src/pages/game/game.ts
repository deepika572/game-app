import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameapiProvider } from '../../providers/gameapi/gameapi';
import { TeamHomePage } from '../team-home/team-home';
import { MapPage } from '../map/map';

/**
 * Generated class for the GamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  public game: any = {};
  constructor(public navCtrl: NavController, public gameapi: GameapiProvider, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
    this.game = this.navParams.data;
    this.game.gameTime = Date.parse(this.game.time);
    // console.log(this.game)
  }

  teamTapped(teamId) {
    let tourneyData = this.gameapi.getCurrentTourney();
    //console.log(tourneyData)
    let team = tourneyData.teams.find(t => t.id === teamId)
    console.log(team)
    this.navCtrl.push(TeamHomePage, team)
  }
  goToDirections() {
    // let tourneyData = this.eliteApi.getCurrentTourney();
    // let location = tourneyData.locations[this.game.locationId];
    // window.location = `geo:${location.latitude},${location.longitude};u=35;`;
  }

  goToMap() {
    this.navCtrl.push(MapPage, this.game);
  }

  isWinner(score1, score2) {
    return Number(score1) > Number(score2) ? 'primary' : 'danger';
  }
}
