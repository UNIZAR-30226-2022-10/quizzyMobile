/*
 * Author: Celia Mainar
 * Filename: shop.page.ts
 * Module: FrontEnd Mobile
 * Description: This is the Shop's page of the aplication
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { ComponentsModule } from '../components/components.module';

import { ShopService } from './shop.service';

export interface SendShop{
  id: number;
  amount: number;
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})

export class ShopPage implements OnInit {
  coins: any;
  actualCosmetics: Array<number>;
  
  itemWildcards: any;
  itemCosmetics: any;

  constructor( public http:HttpClient, private shopService: ShopService, public alert: AlertController, public platform:Platform, public router:Router) {
    this.platform.backButton.subscribeWithPriority(100, () => {
      this.router.navigate(['initial-menu']);
    });
   }

  ngOnInit() {

    this.itemCosmetics = [];
    this.actualCosmetics = [];
    this.getUserCoins();
    
    this.getUserCosmetics().then(data => {
      JSON.parse(JSON.stringify(data["cosmetics"])).forEach(e => {
        this.actualCosmetics.push(e.cosmetic_id);
      });
    });

    console.log(this.actualCosmetics);
    

    this.shopService.getItemsWildcards().then(data => { 
      this.itemWildcards = JSON.parse(JSON.stringify(data["wildcards"])); 
      console.log(this.itemWildcards);
    });


    
    this.shopService.getItemsCosmetics().then(data => {
      JSON.parse(JSON.stringify(data["cosmetics"])).forEach(e => {

          this.itemCosmetics.push({items: e, src:"../../assets/cosmetics/cosmetic_" + e.cosmetic_id + ".jpg"});
      }); 
    });
  }


  getUserCoins() {

    let url= 'http://quizzyappbackend.herokuapp.com/user';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'aplication/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`});

    let options = { headers : headers};
    return new Promise((resolve,reject) => {
      this.http.get(url, options).subscribe(response => {
        resolve(response);
        this.coins = JSON.parse(JSON.stringify(response["wallet"]));
      }, (error) => {
        if(error.status != 200){
          this.shopService.FailToast();
        }
        reject(error);
      });
    });
  };

  getUserCosmetics() {

    let url= 'http://quizzyappbackend.herokuapp.com/user/cosmetics';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'aplication/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`});

    let options = { headers : headers};
    return new Promise((resolve,reject) => {
      this.http.get(url, options).subscribe(response => {
        resolve(response);
      }, (error) => {
        if(error.status != 200){
          this.shopService.FailToast();
        }
        reject(error);
      });
    });
  };

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
            const send: SendShop =
              {id: item.cosmetic_id, amount: item.amount}
            ;
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
      header: 'Description:',
      message: `${item.description}`,
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
            const send: SendShop =
              {id: item.wildcard_id, amount: item.amount}
            ;
            this.shopService.postItemWildcards(send);
            console.log(item);
          }
        }
      ]
    });
    await confirm.present();
  }


  disableButton(cosmetic_id){
    let cosmeticInProperty = false;

    this.actualCosmetics.forEach(e => {
      if(e == cosmetic_id){
        cosmeticInProperty = true;
      }
    });

    return cosmeticInProperty;
  }
}
