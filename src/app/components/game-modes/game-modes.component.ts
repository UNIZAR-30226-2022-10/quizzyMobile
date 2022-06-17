import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { GameOptionsComponent } from '../game-options/game-options.component';
import { CreateJoinComponent } from '../create-join/create-join.component';
import { Router } from '@angular/router';
import { WebSocketProvider } from 'src/app/web-socket.service';

@Component({
  selector: 'app-game-modes',
  templateUrl: './game-modes.component.html',
  styleUrls: ['./game-modes.component.scss'],
})
export class GameModesComponent implements OnInit {

  constructor( private popoverCtrl: PopoverController, public viewCtrl: PopoverController, public router: Router, public webSocket: WebSocketProvider) { }

  ngOnInit() {}

  async chooseTraining() {
    const popover = await this.popoverCtrl.create({
      component: GameOptionsComponent,
    });
    this.viewCtrl.dismiss();
    await popover.present();
  }

  async chooseOptions() {
    const popover = await this.popoverCtrl.create({
      component: CreateJoinComponent,
    });

    this.viewCtrl.dismiss();
    await popover.present();
  }


  
  enqueue(){
    this.webSocket.joinPublicGame(({ok, msg}) => {
      console.log("PUBLIC:JOIN", ok, msg);
      this.viewCtrl.dismiss();
      this.router.navigate(['/public-room']);
    });
  }
}
