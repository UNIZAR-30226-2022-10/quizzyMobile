import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { GameSettingsComponent } from '../game-settings/game-settings.component';
import { IntroduceCodeComponent } from '../introduce-code/introduce-code.component';

@Component({
  selector: 'app-create-join',
  templateUrl: './create-join.component.html',
  styleUrls: ['./create-join.component.scss'],
})
export class CreateJoinComponent implements OnInit {

  constructor( private popoverCtrl: PopoverController) { }
  
  ngOnInit() {}

  async chooseOptions() {
    const popover = await this.popoverCtrl.create({
      component: GameSettingsComponent,
    });

    await popover.present();
  }
  async introduceCode() {
    const popover = await this.popoverCtrl.create({
      component: IntroduceCodeComponent,
    });

    await popover.present();
  }

}
