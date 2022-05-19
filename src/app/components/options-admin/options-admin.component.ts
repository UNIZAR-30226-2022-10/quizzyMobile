import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-options-admin',
  templateUrl: './options-admin.component.html',
  styleUrls: ['./options-admin.component.scss'],
})
export class OptionsAdminComponent implements OnInit {

  constructor(public router: Router, public viewCtrl: PopoverController) { }

  ngOnInit() {}

  closeSession() {
    this.viewCtrl.dismiss();
    localStorage.clear();
    this.router.navigate(['/home'])
  }

  validateQuestion() {
    this.viewCtrl.dismiss();
    this.router.navigate(['/validate-question'])
  }


}
