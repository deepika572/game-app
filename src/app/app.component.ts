import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyteamsPage } from '../pages/myteams/myteams';
import { TournamentsPage } from '../pages/tournaments/tournaments';
import { UserSettingsProvider } from '../providers/user-settings/user-settings';
import { GameapiProvider } from '../providers/gameapi/gameapi';
import { TeamDetailPage } from '../pages/team-detail/team-detail';
import { TeamHomePage } from '../pages/team-home/team-home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  favourites: any[];
  rootPage: any = MyteamsPage;
  @ViewChild('myNav') nav: NavController
  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public usersettingsapi: UserSettingsProvider,
    public events: Events,
    public gameapi: GameapiProvider) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.getFavouriteTeams();
      console.log(this.getFavouriteTeams())

    });
  }

  goToHome() {
    this.nav.push(MyteamsPage);
  }
  goToTournaments() {
    this.nav.push(TournamentsPage)
  }
  getFavouriteTeams() {
    this.favourites = this.usersettingsapi.getFavouriteTeam();
  }
  goToTeam(item) {
    this.gameapi.getTournamentsData(item.tournamentId).subscribe(data => {
      this.nav.push(TeamHomePage, data);
    })
  }
}
