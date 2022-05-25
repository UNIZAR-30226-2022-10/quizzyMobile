import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DescriptionComponent } from '../components/description/description.component';
import { Platform, PopoverController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {
  itemCosmetics: any;
  Cosmetics: Array<{ items: any, src: string}>;
  Wildcards: any;
  actualCosmetic = localStorage.getItem('cosmetic');;

  constructor(public http:HttpClient, private popoverCtrl: PopoverController, public platform:Platform, public router:Router, public toastController:ToastController) { 
    this.platform.backButton.subscribeWithPriority(100, () => {
      this.router.navigate(['initial-menu']);
    });
  }

  ngOnInit() {
    this.Cosmetics = [];
    this.Wildcards = [];

    this.getItemsCosmetics().then(data => {
      JSON.parse(JSON.stringify(data["cosmetics"])).forEach( e => {
        this.Cosmetics.push({items: e, src:"../../assets/cosmetics/cosmetic_" + e.cosmetic_id + ".png"})
      }
      ); 
    });

    this.getItemsWildcards().then(data => {
      JSON.parse(JSON.stringify(data["wildcards"])).forEach( e => {
        this.Wildcards.push(e);
      }
      ); 
    });

    console.log(this.Wildcards);
  }

  /**
   * Function that returns all the cosmetics on the API
   *
   * @returns All the cosmetics
   */
   getItemsCosmetics(){
    const url = 'http://quizzyappbackend.herokuapp.com/user/cosmetics';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`});
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
   * Function that returns all the wildcards on the API
   *
   * @returns All the wildcards
   */
   getItemsWildcards(){
    const url = 'http://quizzyappbackend.herokuapp.com/user/wildcards';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`});
    let options = { headers : headers};
    return new Promise(resolve => {
      this.http.get(url,options).subscribe(data => {
        resolve(data);
      }, error => {
        console.log(error);
      });
    });
  }

  async viewDescription(wildcard){
    const popover = await this.popoverCtrl.create({
      component: DescriptionComponent,
      componentProps: {description: wildcard.description}
    });

    await popover.present(); 
  }

  /**
   * Function that change the cosmetic
   *
   * @returns Cosmetic id
   */
   chooseCosmetic(cosmetic){
    console.log(cosmetic);
    const url = 'http://quizzyappbackend.herokuapp.com/user/equip';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`});
    let options = { headers : headers};
    return new Promise(resolve => {
      this.http.put(url, {id: cosmetic}, options).subscribe(data => {
        localStorage.setItem('cosmetic', cosmetic);
        console.log(cosmetic);
        resolve(data);
      }, error => {
        console.log(error);
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
