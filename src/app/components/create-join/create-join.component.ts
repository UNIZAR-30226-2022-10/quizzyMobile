import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { WebSocketProvider } from 'src/app/web-socket.service';
import { GameSettingsComponent } from '../game-settings/game-settings.component';

@Component({
  selector: 'app-create-join',
  templateUrl: './create-join.component.html',
  styleUrls: ['./create-join.component.scss'],
})
export class CreateJoinComponent implements OnInit {

  constructor( public http: HttpClient, public toastController: ToastController, public router: Router, public webSocket: WebSocketProvider, public alert: AlertController, private popoverCtrl: PopoverController, public viewCtrl: PopoverController) { }
  
  ngOnInit() {}

  async chooseOptions() {
    const popover = await this.popoverCtrl.create({
      component: GameSettingsComponent,
    });
    this.viewCtrl.dismiss();
    await popover.present();
  }


  async introduceCode() {

    const confirm = await this.alert.create({
      header: 'Introduce Game Code:',
      inputs: [
        {
          name: 'code',
          type: 'number',
          value: 0
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
          text: 'Join',
          handler: data => {
            this.webSocket.joinPrivateGame(
             data.code
            , (e) => {
              if(e.ok){
                console.log(e);

                this.viewCtrl.dismiss();
                this.router.navigate(['/private-room'], {
                  state: {
                    rid: data.code,
                    players:e.players,
                    create: false
                  }
                });
              }
              else{
                this.FailToast();
                this.viewCtrl.dismiss();
                this.router.navigate(['/initial-menu']);
              }
        
              
            })
          }
        }
      ]
    });
    await confirm.present();
  }

  userInfo(data){
    let url= 'http://quizzyappbackend.herokuapp.com/user/reduced';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'});
      let params = new HttpParams()
      .set('nickname', data)
    let options = { headers : headers, params:params};    
    return new Promise((resolve,reject) => {
      this.http.get(url, options ).subscribe(response => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  /**
     * @summary function that shows a toast when the user or the password aren't on the base data
     */
   async FailToast() {
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
