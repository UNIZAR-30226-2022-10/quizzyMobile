/*
 * Author: Celia Mainar
 * Filename: shop.service.ts
 * Module: FrontEnd Mobile
 * Description: This is the page about the connection between the API and the Shop's page
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToastController } from '@ionic/angular';

export interface Item{
  id: number;
  name: string;
  price: number;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})

export class ShopService {
  data: any;

  private purchases = [];
  private count = new BehaviorSubject(0);

  constructor(public toastController: ToastController, public http: HttpClient, public router: Router) { }

  getItemsPrueba(){
    return this.data;
  }

  /**
   * Function that returns all the wildcards on the API
   *
   * @returns All the wildcards
   */
  getItemsWildcards(){
    const url = 'http://quizzyappbackend.herokuapp.com/shop/wildcards';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'aplication/json'});
    let options = { headers : headers};
    return new Promise(resolve => {
      this.http.get(url,options).subscribe(data => {
        console.log(data);
        resolve(data);
      }, error => {
        console.log(error);
      });
    });
  }

  /**
   * Function that returns all the cosmetics on the API
   *
   * @returns All the cosmetics
   */
  getItemsCosmetics(){
    const url = 'http://quizzyappbackend.herokuapp.com/shop/cosmetics';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'aplication/json'});
    let options = { headers : headers};
    return new Promise(resolve => {
      this.http.get(url,options).subscribe(data => {
        resolve(data);
      }, error => {
        console.log(error);
      });
    });
  }

  /**
   * @param item message to send to the API
   * @returns
   */

  postItemWildcards(item){
    
    const url = 'http://quizzyappbackend.herokuapp.com/shop/wildcards/buy';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'aplication/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`});
    let options = { headers : headers};
    return new Promise((resolve, reject) => {
      this.http.post(url, JSON.stringify(item), options).subscribe(response => {
        resolve(response);
      }, (error) => {
        console.log(error);
        reject(error);
      });
    });
    
  }

  /**
   *
   * @param item message to send to the API
   * @returns
   */
  postItemCosmetic(item){
    const url = 'http://quizzyappbackend.herokuapp.com/shop/cosmetics/buy';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'aplication/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`});
    let options = { headers : headers};
    return new Promise((resolve, reject) => {
      this.http.post(url, {id: item.id},options).subscribe(response => {
        resolve(response);
      }, (error) => {
        console.log(error);
        reject(error);
      });
    });
  }

  /**
     * @summary function that shows a toast when the user or the password aren't on the base data
     */
   async FailToast() {
    const toast = await this.toastController.create({
      header: 'Connection failed',
      position: 'top',
      buttons:[
        {
          text: 'Aceptar',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
    await toast.onDidDismiss();
  }
}
