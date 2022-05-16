import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-introduce-code',
  templateUrl: './introduce-code.component.html',
  styleUrls: ['./introduce-code.component.scss'],
})
export class IntroduceCodeComponent implements OnInit {

  constructor(public viewCtrl: PopoverController) { }

  ngOnInit() {}

}
