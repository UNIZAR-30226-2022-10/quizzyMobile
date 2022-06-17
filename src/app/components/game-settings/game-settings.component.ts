import { Component, OnInit } from '@angular/core';
import { PopoverController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { WebSocketProvider } from 'src/app/web-socket.service';

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.scss'],
})
export class GameSettingsComponent implements OnInit {
  

  constructor(public toastController: ToastController, public webSocket: WebSocketProvider, public router: Router, public viewCtrl: PopoverController) { }

  wildcards = true;
  time = 15;
  players = 6;
  difficulty = 1;

  gameOptions : {wildcards: boolean, time: number, players: number, difficulty: string};

  ngOnInit() {
    this.gameOptions = {wildcards: true, time: 0, players: 0, difficulty: ''}
  }

  rangePlayersChanged(event){
    this.players=event.detail.value;
  }

  rangeTimeChanged(event){
    this.time=event.detail.value;
  }

  segmentChanged(event)
  {
    this.wildcards=event.detail.value;
  }

  segmentDifficultyChanged(event){
    this.difficulty = event.detail.value;
  }

  onClick(){
    this.gameOptions.time = this.time;
    this.gameOptions.players = this.players;
    this.gameOptions.wildcards = this.wildcards;

    if (this.difficulty == 0){
      this.gameOptions.difficulty = 'easy';
    }
    else if (this.difficulty == 1){
      this.gameOptions.difficulty = 'medium';
    }
    else{
      this.gameOptions.difficulty = 'hard';
    }

    this.webSocket.createPrivateGame({
      turnTimeout : this.gameOptions.time * 1000,
      difficulty : this.gameOptions.difficulty,
      wildcardsEnable : this.gameOptions.wildcards
    }, (e) => {

      if(e.ok){
        this.viewCtrl.dismiss();
        this.router.navigate(['/private-room'], {
          state: {
            rid: e.rid,
            players: [
              {
                nickname : localStorage.getItem('nickname'),
                cosmetic: localStorage.getItem('cosmetic')
              }
            ],
            create: true,
            difficulty: this.gameOptions.difficulty,
            wildcardsUse: this.gameOptions.wildcards,
            timeout: this.gameOptions.time * 1000
          }
        });
      }
      else{
        this.FailToast();
        this.viewCtrl.dismiss();
        this.router.navigate(['/initial-menu']);
      }

      
    })
  }

  /**
     * @summary function that shows a toast when the user or the password aren't on the base data
     */
   async FailToast() {
    const toast = await this.toastController.create({
      header: 'Private game creation failed',
      position: 'top',
      buttons:[
        {
          text: 'Aceptar',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
    await toast.onDidDismiss();
  } 
  
}
