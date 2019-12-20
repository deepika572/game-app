import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { GameapiProvider } from '../../providers/gameapi/gameapi';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  
  public map : any = {}
  constructor(public gameapi: GameapiProvider, public navParams: NavParams, public platform: Platform) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    let games = this.navParams.data;
    let tourneyData = this.gameapi.getCurrentTourney();
    let location = tourneyData.locations[games.locationId];

    this.map = {
      lnt : location.latitude,
      lng : location.longitude,
      zoom : 12,
      markerLabel : games.location
    };
  }

}
