import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TournamentsPage } from '../tournaments/tournaments';
import { MapPage } from '../map/map';

@IonicPage()
@Component({
  selector: 'page-myteams',
  templateUrl: 'myteams.html',
})
export class MyteamsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  gotoTournaments(){
    this.navCtrl.push(TournamentsPage);
  }

  goToMap(){
    this.navCtrl.push(MapPage)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyteamsPage');
  }
  ionViewWillUnload(){
    console.log('unload Myteampage')
  }
  ionViewCanLeave(){
    console.log('canleave Myteampage')
  }
  ionViewWillLeave(){
    console.log('willleave Myteampage')
  }
  ionViewDidLeave(){
    console.log('didleave Myteampage')
  }
}
