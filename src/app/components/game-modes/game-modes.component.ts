import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { GameOptionsComponent } from '../game-options/game-options.component';
import { CreateJoinComponent } from '../create-join/create-join.component';

@Component({
  selector: 'app-game-modes',
  templateUrl: './game-modes.component.html',
  styleUrls: ['./game-modes.component.scss'],
})
export class GameModesComponent implements OnInit {

  constructor( private popoverCtrl: PopoverController) { }

  ngOnInit() {}

  async chooseTraining() {
    const popover = await this.popoverCtrl.create({
      component: GameOptionsComponent,
    });

    await popover.present();
  }

  async chooseOptions() {
    const popover = await this.popoverCtrl.create({
      component: CreateJoinComponent,
    });

    await popover.present();
  }
}
