//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import { Events } from 'ionic-angular';

@Injectable()
export class UserSettingsProvider {

  constructor(private storage: Storage, public events: Events) {
  }

  favouriteTeam(team, tournamentId, tournamentName) {
    let item = { team: team, tournamentId: tournamentId, tournamentName: tournamentName };
    this.storage.set(team.id.toString(), JSON.stringify(item));
    this.events.publish('favorite:changed');
  }

  unfavouriteTeam(team) {
    this.storage.remove(team.id.toString());
    this.events.publish('favorite:changed');
  }

  isFavouriteTeam(teamId: string): Promise<boolean> {
    return this.storage.get(teamId).then(value => value ? true : false)
  }

  getFavouriteTeam() {
    let results = [];
    this.storage.forEach(item => {
      console.log("storage item" + item)
      results.push(JSON.parse(item))
    });
    return results;
  }
}
