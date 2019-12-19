//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'

@Injectable()
export class UserSettingsProvider {

  constructor(private storage: Storage) {
    console.log('Hello UserSettingsProvider Provider');
  }

  favouriteTeam(team, tournamentId, tournamentName) {
    let item = { team: team, tournamentId: tournamentId, tournamentName: tournamentName };
    this.storage.set(team.id.toString(), JSON.stringify(item))
  }

  unfavouriteTeam(team) {
    this.storage.remove(team.id.toString())
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
