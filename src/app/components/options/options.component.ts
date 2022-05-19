import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit {

  constructor(public router: Router, public viewCtrl: PopoverController) { }

  ngOnInit() {}

  closeSession() {
    this.viewCtrl.dismiss();
    localStorage.clear();
    this.router.navigate(['/home'])
  }

  suggestQuestion() {
    this.viewCtrl.dismiss();
    this.router.navigate(['/suggest'])
  }

}
