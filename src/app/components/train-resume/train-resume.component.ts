import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-train-resume',
  templateUrl: './train-resume.component.html',
  styleUrls: ['./train-resume.component.scss'],
})
export class TrainResumeComponent implements OnInit {
  @Input("answers") answers;

  constructor(public screenOrientation: ScreenOrientation, public router: Router, public viewCtrl: PopoverController) { }

  ngOnInit() {
  }

  moveToMenu(){
    this.screenOrientation.unlock();
    this.viewCtrl.dismiss();
    this.router.navigate(['initial-menu']);
  }

}
