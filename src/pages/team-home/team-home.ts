import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StandingsPage } from '../standings/standings';
import { TeamDetailPage } from '../team-detail/team-detail';
import { MyteamsPage } from '../myteams/myteams';
import { GameapiProvider } from '../../providers/gameapi/gameapi';


@IonicPage()
@Component({
  selector: 'page-team-home',
  templateUrl: 'team-home.html',
})
export class TeamHomePage {
  public team : any = {}; 
  public teamDetailTab = TeamDetailPage;
  public standingTab = StandingsPage;
  constructor(public navCtrl: NavController, public navParams: NavParams,public gameapi : GameapiProvider) {
    this.team = this.navParams.data;
  }

  goToHome(){
    this.navCtrl.push(MyteamsPage)
  }
  ionViewDidLoad() {
  
  }

}
