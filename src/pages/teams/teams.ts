import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TeamDetailPage } from '../team-detail/team-detail';
import { TeamHomePage } from '../team-home/team-home';
import { GameapiProvider } from '../../providers/gameapi/gameapi';

@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {
  teams: any[];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public gameapi: GameapiProvider) {
    // this.teams = [
    //   {id:1,name:'HC Elite'},
    //   {id:2,name:'DC Thunder'},
    //   {id:3,name:'Team Takeover'}
    // ]
  }

  ionViewDidLoad() {
    let selectedTourney = this.navParams.data;
    console.log(selectedTourney);
    this.gameapi.getTournamentsData(selectedTourney.id).subscribe(data => {
      this.teams = data.teams;
      console.log(data.teams)
    })
  }
  itemTapped($event, team) {
    this.navCtrl.push(TeamHomePage, team)
  }
}
