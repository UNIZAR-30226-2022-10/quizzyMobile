/*
 * Author: Celia Mainar
 * Filename: home.page.ts
 * Module: FrontEnd Mobile
 * Description: This is the begining page
 */
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
const { App } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public platform : Platform) {
    this.platform.backButton.subscribeWithPriority(100, () => {
      navigator['app'].exitApp();
    });
  }

}
