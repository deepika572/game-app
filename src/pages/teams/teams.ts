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
  queryText: string;
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
        console.log(this.allTeams);
        loader.dismiss();
      });
    })
   // this.filterFunction();
    console.log(this.teams)
  }

  itemTapped($event, team) {
    this.navCtrl.push(TeamHomePage, team)
  }

  updateTeams(){
    let queryTextLower = this.queryText.toLowerCase();
    let filteredTeams = [];
    _.forEach(this.allTeamsDivisions, td => {
      let teams = _.filter(td.divisionTeams, t => (<any>t).name.toLowerCase().includes(queryTextLower));
      if (teams.length) {
        filteredTeams.push({ divisionName: td.divisionName, divisionTeams: teams });
      }
    });

    this.teams = filteredTeams;
  }
}
