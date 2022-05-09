/*
 * Author: Celia Mainar
 * Filename: shop.page.ts
 * Module: FrontEnd Mobile
 * Description: This is the Shop's page of the aplication
 */
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { ShopService } from './shop.service';

export interface SendShop{
  id: number;
  amout: number;
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})

export class ShopPage implements OnInit {
  itemWildcards: any;
  itemCosmetics: any;

  constructor(private shopService: ShopService, public alert: AlertController) { }

  ngOnInit() {
    this.itemWildcards = this.shopService.getItemsPrueba();
    this.itemCosmetics = this.shopService.getItemsPrueba();
    //this.shopService.getItemsWildcards().then(data => { this.itemWildcards = data; });
    //this.shopService.getItemsCosmetics().then(data => { this.itemCosmetics = data; });
  }

  /**
   * Function that shows a pop Up to buy the cosmetic
   *
   * @param item to buy
   */
  async buyCosmetics(item){
    const confirm = await this.alert.create({
      header: 'Do you want to buy the Item?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Buy',
          handler: () => {
            item.amount = 1;
            const send: SendShop[] = [
              {id: item.id, amout: item.amount}
            ];
            this.shopService.postItemCosmetic(send);
            console.log(item);
          }
        }
      ]
    });
    await confirm.present();
  }

  /**
   * Function that shows a pop Up to buy the wildcard
   *
   * @param item to buy
   */
  async buyWildcards(item){
    const confirm = await this.alert.create({
      header: 'Do you want to buy the Item?',
      inputs: [
        {
          name: 'amount',
          type: 'number',
          value: 1
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Buy',
          handler: data => {
            item.amount = data.amount;
            const send: SendShop[] = [
              {id: item.id, amout: item.amount}
            ];
            this.shopService.postItemWildcards(send);
            console.log(item);
          }
        }
      ]
    });
    await confirm.present();
  }

}
