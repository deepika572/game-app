import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TeamsPage } from '../teams/teams';
import { GameapiProvider } from '../../providers/gameapi/gameapi';

/**
 * Generated class for the TournamentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {
   public tournaments : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public gameapi: GameapiProvider,
    public loading : LoadingController) {
  }

  ionViewDidLoad() {
    let loader = this.loading.create({
      content : "Getting Tournaments......"
    })
    loader.present().then(() => {
      this.gameapi.getTournaments().then(data => this.tournaments = data);
      loader.dismiss();
    })
    console.log('ionViewDidLoad TournamentsPage');
  }
  itemTapped($event,team){
    this.navCtrl.push(TeamsPage,team)
  }
  ionViewWillUnload(){
    console.log('unload tournamentpage')
  }
  // ionViewCanEnter(){
  //   console.log('canenter tournamentpage')
  // }
  // ionViewWillEnter(){
  //   console.log('willenter tournamentpage')
  // }
  // ionViewDidEnter(){
  //   console.log('didenter tournamentpage')
  // }
}
