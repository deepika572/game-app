import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';

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
  title: string = 'My first AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;
  height = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
    
    console.log(platform.height());
    this.height = platform.height() - 56;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

}
