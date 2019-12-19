import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameapiProvider } from '../../providers/gameapi/gameapi';
import { TeamHomePage } from '../team-home/team-home';

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
  }

  teamTapped(teamId) {
    let tourneyData = this.gameapi.getCurrentTourney();
    let team = tourneyData.teams.find(t => t.id === teamId)
    this.navCtrl.push(TeamHomePage, team)
  }
}
