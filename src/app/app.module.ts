import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
//import { AgmCoreModule } from '@agm/core';
import { MyApp } from './app.component';
import { MyteamsPage } from '../pages/myteams/myteams';
import { TeamDetailPage } from '../pages/team-detail/team-detail';
import { TeamsPage } from '../pages/teams/teams';
import { TournamentsPage } from '../pages/tournaments/tournaments';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GamePage } from '../pages/game/game';
import { StandingsPage } from '../pages/standings/standings';
import { TeamHomePage } from '../pages/team-home/team-home';
import { GameapiProvider } from '../providers/gameapi/gameapi';
import { MapPage } from '../pages/map/map';

@NgModule({
  declarations: [
    MyApp,
    MyteamsPage,
    TeamDetailPage,
    TeamsPage,
    GamePage,
    TournamentsPage,
    StandingsPage,
    TeamHomePage,
    MapPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    // AgmCoreModule.forRoot({ apiKey : 'AIzaSyCcrBSOrmJ2hv0iO744xFong_WzuuCqk5w'})
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyCcrBSOrmJ2hv0iO744xFong_WzuuCqk5w'
    // })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyteamsPage,
    TeamDetailPage,
    TeamsPage,
    GamePage,
    TournamentsPage,
    StandingsPage,
    TeamHomePage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GameapiProvider
  ]
})
export class AppModule {}
