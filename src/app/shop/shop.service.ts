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
  data: Item[] = [
    {id: 0, name: '50%', price:9, amount:0},
    {id: 1, name: '2º Oportunidad', price:15, amount:0},
    {id: 2, name: 'ppp', price:14, amount:0}
  ];

  private purchases = [];
  private count = new BehaviorSubject(0);

  constructor(public http: HttpClient, public router: Router) { }

  getItemsPrueba(){
    return this.data;
  }

  /**
   * Function that returns all the wildcards on the API
   *
   * @returns All the wildcards
   */
  getItemsWildcards(){
    const url = 'http://localhost:5000/shop/wildcards';
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
   * Function that returns all the cosmetics on the API
   *
   * @returns All the cosmetics
   */
  getItemsCosmetics(){
    const url = 'http://localhost:5000/shop/cosmetics';
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
    const url = 'http://localhost:5000/shop/wildcards';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'aplication/json'});
    let options = { headers : headers};
    return new Promise((resolve, reject) => {
      this.http.post(url, JSON.stringify(item),options).subscribe(response => {
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
    const url = 'http://localhost:5000/shop/cosmetics';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'aplication/json'});
    let options = { headers : headers};
    return new Promise((resolve, reject) => {
      this.http.post(url, JSON.stringify(item),options).subscribe(response => {
        resolve(response);
      }, (error) => {
        console.log(error);
        reject(error);
      });
    });
  }
}
