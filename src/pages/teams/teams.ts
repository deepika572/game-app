import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TeamHomePage } from '../team-home/team-home';
import { GameapiProvider } from '../../providers/gameapi/gameapi';
import _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {
  teams: any[];
  allTeams: any;
  allTeamsDivisions: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public gameapi: GameapiProvider,
    public loading: LoadingController) {
  }

  ionViewDidLoad() {
    let selectedTourney = this.navParams.data;
    let loader = this.loading.create({
      content: "Getting data......"
    })
    loader.present().then(() => {
      this.gameapi.getTournamentsData(selectedTourney.id).subscribe(data => {
        this.allTeams = data.teams;
        this.allTeamsDivisions = _.chain(data.teams)
          .groupBy('division')
          .toPairs()
          .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
          .value();
        this.teams = this.allTeamsDivisions;
        console.log('division teams', this.teams)
        loader.dismiss();
      });
    })

  }

  itemTapped($event, team) {
    this.navCtrl.push(TeamHomePage, team)
  }
}
