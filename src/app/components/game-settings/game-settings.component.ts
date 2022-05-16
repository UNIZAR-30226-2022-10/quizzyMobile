import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.scss'],
})
export class GameSettingsComponent implements OnInit {

  constructor(public router: Router, public viewCtrl: PopoverController) { }

  wildcards;

  ngOnInit() {}

  segmentChanged(event)
  {
    this.wildcards=event.detail.value;
  }

  onClick(){
    this.viewCtrl.dismiss();
    this.router.navigate['/waiting-players']
  }
  
}
