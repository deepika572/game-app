import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TournamentsPage } from '../tournaments/tournaments';
import { MapPage } from '../map/map';
import { TeamHomePage } from '../team-home/team-home';
import { GameapiProvider } from '../../providers/gameapi/gameapi';
import { UserSettingsProvider } from '../../providers/user-settings/user-settings';

@IonicPage()
@Component({
  selector: 'page-myteams',
  templateUrl: 'myteams.html',
})
export class MyteamsPage {

  public favourites = [];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public gameapi: GameapiProvider,
    public loading: LoadingController,
    public usersettingsapi: UserSettingsProvider) {
  }
  favoriteTapped($event, favorite) {
    let loader = this.loading.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });
    loader.present();
    this.gameapi.getTournamentsData(favorite.tournamentId)
      .subscribe(t => this.navCtrl.push(TeamHomePage, favorite.team));
  }
  gotoTournaments() {
    this.navCtrl.push(TournamentsPage);
  }

  ionViewDidEnter() {
    this.favourites = this.usersettingsapi.getFavouriteTeam();
  }
  goToMap() {
    this.navCtrl.push(MapPage)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyteamsPage');
  }
  ionViewWillUnload() {
    console.log('unload Myteampage')
  }
  ionViewCanLeave() {
    console.log('canleave Myteampage')
  }
  ionViewWillLeave() {
    console.log('willleave Myteampage')
  }
  ionViewDidLeave() {
    console.log('didleave Myteampage')
  }
}
