import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { GameModesComponent } from '../components/game-modes/game-modes.component';
import { OptionsComponent } from '../components/options/options.component';
import { OptionsAdminComponent } from '../components/options-admin/options-admin.component';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { WebSocketProvider } from '../web-socket.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';



@Component({
  selector: 'app-initial-menu',
  templateUrl: './initial-menu.page.html',
  styleUrls: ['./initial-menu.page.scss'],
})
export class InitialMenuPage implements OnInit {

    photo;
    username = localStorage.getItem('nickname'); //Leer de la sesión
    coins;
    cosmetic : any;
    cosmetic_src :any; 
    admin : boolean;
    

    data: any[];
    dataNt: any[];
    dataIn: any[];

    constructor(public http: HttpClient, public toastController: ToastController, private popoverCtrl: PopoverController, public router: Router, public platform: Platform, public webSocket: WebSocketProvider) {
      this.platform.backButton.subscribeWithPriority(100, () => {
        navigator['app'].exitApp();
        //Cambiarlo de lugar (socket)
        this.webSocket.disconnectSocket();
      });
      this.webSocket.connectSocket();
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

    getPublicGames(){
      let url= 'http://quizzyappbackend.herokuapp.com/games/public';
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`});

      let options = { headers : headers};
      return new Promise((resolve,reject) => {
        this.http.get(url, options).subscribe(response => {
          this.data = response['games'];
          resolve(response);
        }, (error) => {
          if(error.status != 200){
            this.FailToast();
          }
          reject(error);
        });
      });
    }

    getPrivateGames(){
      let url= 'http://quizzyappbackend.herokuapp.com/games/private';
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`});

      let options = { headers : headers};
      return new Promise((resolve,reject) => {
        this.http.get(url, options).subscribe(response => {
          this.dataNt = response['games'];
          console.log(this.dataNt);
          resolve(response);
        }, (error) => {
          if(error.status != 200){
            this.FailToast();
          }
          reject(error);
        });
      });
    }    

    getInvitaciones(){
      let url= 'http://quizzyappbackend.herokuapp.com/games/invite';
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`});

      let options = { headers : headers};
      return new Promise((resolve,reject) => {
        this.http.get(url, options).subscribe(response => {
          this.dataIn = response['invites'];
          
          resolve(response);
        }, (error) => {
          if(error.status != 200){
            this.FailToast();
          }
          reject(error);
        });
      });
    }

    doRefresh(event){
      this.getData().then( e => {
        console.log("ENTRO");
        this.admin = JSON.parse(JSON.stringify(e["is_admin"]));
        this.coins = JSON.parse(JSON.stringify(e["wallet"]));
        this.cosmetic = JSON.parse(JSON.stringify(e["actual_cosmetic"]));
        localStorage.setItem('cosmetic', this.cosmetic);
        this.cosmetic_src = "../../assets/cosmetics/cosmetic_" + this.cosmetic + ".png";
      
      });

      this.getPublicGames();
      this.getPrivateGames();
      this.getInvitaciones();
    
      setTimeout(() => {
        event.target.complete()
      }, 2000);
    }
    
    ngOnInit() { 
      this.getData().then( e => {
        console.log("ENTRO");
        this.admin = JSON.parse(JSON.stringify(e["is_admin"]));
        this.coins = JSON.parse(JSON.stringify(e["wallet"]));
        this.cosmetic = JSON.parse(JSON.stringify(e["actual_cosmetic"]));
        localStorage.setItem('cosmetic', this.cosmetic);
        this.cosmetic_src = "../../assets/cosmetics/cosmetic_" + this.cosmetic + ".png";
      });

      this.getPublicGames();
      this.getPrivateGames();
      this.getInvitaciones();
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


    accept(data){

      console.log("ENTRO", data.rid)
      this.webSocket.joinPrivateGame(
        data.rid
       , (e) => {
         if(e.ok){
           console.log(e);

           this.decline(data)

           this.router.navigate(['/private-room'], {
             state: {
               rid: data.rid,
               players:e.players,
               create: false
             }
           });
         }
         else{
          this.decline(data)
           this.FailJoinToast();
           this.router.navigate(['/initial-menu']);
         }
   
         
       })
    }

    decline(data){
      const url = 'http://quizzyappbackend.herokuapp.com/games/invite';
      let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`});
      let options = { headers : headers, body: {nickname: data.leader_nickname, rid: data.rid}};
      return new Promise(resolve => {
        this.http.delete(url, options).subscribe(response => {
          console.log(this.dataIn)
          this.dataIn = this.dataIn.filter((u) => u.leader_nickname != data.leader_nickname || u.rid != data.rid )
          console.log(this.dataIn)
          resolve(response);
        }, (error) => {
          console.log(error);
        });
      });
    }

    /**
     * @summary function that shows a toast when the user or the password aren't on the base data
     */
   async FailJoinToast() {
    const toast = await this.toastController.create({
      header: 'Private game join failed',
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
