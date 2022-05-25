import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, Platform, ToastController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { GameModesComponent } from '../components/game-modes/game-modes.component';
import { OptionsComponent } from '../components/options/options.component';
import { OptionsAdminComponent } from '../components/options-admin/options-admin.component';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';



@Component({
  selector: 'app-initial-menu',
  templateUrl: './initial-menu.page.html',
  styleUrls: ['./initial-menu.page.scss'],
})
export class InitialMenuPage implements OnInit {

    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll
    photo;
    username = localStorage.getItem('nickname'); //Leer de la sesión
    coins;
    cosmetic : any;
    cosmetic_src :any; 
    admin : boolean;
    

    data: any[] = Array(3);
    constructor(public http: HttpClient, public toastController: ToastController, private popoverCtrl: PopoverController, public router: Router, public platform: Platform) {
      this.platform.backButton.subscribeWithPriority(100, () => {
        navigator['app'].exitApp();
      });
     }
    getData() {

      let url= 'http://quizzyappbackend.herokuapp.com/user';
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`});

      let options = { headers : headers};
      return new Promise((resolve,reject) => {
        this.http.get(url, options).subscribe(response => {
          resolve(response);
          console.log(response);
        }, (error) => {
          if(error.status != 200){
            this.FailToast();
          }
          reject(error);
        });
      });
    };
    ngOnInit() { 
      this.getData().then( e => {
        console.log("ENTRO");
        this.admin = JSON.parse(JSON.stringify(e["is_admin"]));
        this.coins = JSON.parse(JSON.stringify(e["wallet"]));
        this.cosmetic = JSON.parse(JSON.stringify(e["actual_cosmetic"]));
        localStorage.setItem('cosmetic', this.cosmetic);
        this.cosmetic_src = "../../assets/cosmetics/cosmetic_" + this.cosmetic + ".png";
      });
      //console.log(this.cosmetic);
      //this.cosmetic_src = "../../assets/cosmetics/cosmetic_" + this.cosmetic + ".jpg";
      //console.log("../../assets/cosmetics/cosmetic_" + this.cosmetic + ".jpg")
    }

    async chooseOptions() {
      const popover = await this.popoverCtrl.create({
        component: GameModesComponent,
      });

      await popover.present();
    }

    async settings() {
      
      if(this.admin){
        const popover = await this.popoverCtrl.create({
          component: OptionsAdminComponent,
        });

        await popover.present(); 
      }
      else
      {
        const popover = await this.popoverCtrl.create({
          component: OptionsComponent,
        });
        
        await popover.present();
      }

      
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
