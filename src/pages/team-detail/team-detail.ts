import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { GameapiProvider } from '../../providers/gameapi/gameapi';
import * as _ from 'lodash';
import { GamePage } from '../game/game';
import moment from 'moment';
import { UserSettingsProvider } from '../../providers/user-settings/user-settings';

@IonicPage()
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {
  public team: any = {};
  public tourneyData: any;
  public games: any = [];
  public teamStandings: any = {};
  public dateFilter: string;
  public allGames: any[];
  public isFollowing: any;
  public useDateFilter: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public gameapi: GameapiProvider,
    public alertController: AlertController,
    public toastController: ToastController,
    public usersettingsapi : UserSettingsProvider) {

    this.isFollowing = false;
    this.useDateFilter = false;
  }

  ionViewDidLoad() {
    console.log("teamdetail page");
    this.team = this.navParams.data;
    //console.log(this.team)
    this.tourneyData = this.gameapi.getCurrentTourney();
    // console.log(this.tourneyData)

    this.games = _.chain(this.tourneyData.games)
      .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
      .map(g => {
        let isTeam1 = (g.team1Id === this.team.id);
        let opponentName = isTeam1 ? g.team2 : g.team1;
        let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
        return {
          gameId: g.id,
          opponent: opponentName,
          time: Date.parse(g.time),
          location: g.location,
          locationUrl: g.locationUrl,
          scoreDisplay: scoreDisplay,
          homeAway: (isTeam1 ? "vs." : "at")
        };
      })
      .value();
    this.allGames = this.games;
    this.teamStandings = _.find(this.tourneyData.standings, { "teamId": this.team.id })
     this.usersettingsapi.isFavouriteTeam(this.team.id.toString()).then(value => this.isFollowing = value)
  }

  getScoreDisplay(isTeam1, team1Score, team2Score) {
    if (team1Score && team2Score) {
      var teamScore = (isTeam1 ? team1Score : team2Score);
      var opponentScore = (isTeam1 ? team2Score : team1Score);
      var winIndicator = teamScore > opponentScore ? "W: " : "L: ";
      return winIndicator + teamScore + "-" + opponentScore;
    }
    else {
      return "";
    }
  }

  gameClicked($event, game) {
    let sourceGame = this.tourneyData.games.find(g => g.id === game.gameId);
    this.navCtrl.parent.parent.push(GamePage, sourceGame)
  }

  getScoreWorl(game) {
    return game.scoreDisplay ? game.scoreDisplay[0] : '';
  }
  getScoreDisplayBadgeClass(game) {
    return game.scoreDisplay.indexOf('W:') === 0 ? 'primary' : 'danger';
  }

  toggleFollow() {
    if (this.isFollowing) {
      let confirm = this.alertController.create({
        title: 'Unfollow?',
        message: 'Are you sure you want to unfollow?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.isFollowing = false;
              this.usersettingsapi.unfavouriteTeam(this.team)
              let toast = this.toastController.create({
                message: 'You have unfollowed this team.',
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
            }
          },
          { text: 'No' }
        ]
      });
      confirm.present();
    } else {
      this.isFollowing = true;
      this.usersettingsapi.favouriteTeam(this.team, this.tourneyData.tournament.id, this.tourneyData.tournament.name)
    }
  }

  dateChanged() {
    if (this.useDateFilter) {
      this.games = _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'));
    }
    else {
      this.games = this.allGames;
    }

  }
}

