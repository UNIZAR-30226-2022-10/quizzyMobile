import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {

  constructor(public platform:Platform, public router:Router) {
    this.platform.backButton.subscribeWithPriority(100, () => {
      this.router.navigate(['/initial-menu']);
    });
   }

  ngOnInit() {
  }

}
