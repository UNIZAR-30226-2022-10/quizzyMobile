import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-invite-friend',
  templateUrl: './invite-friend.page.html',
  styleUrls: ['./invite-friend.page.scss'],
})
export class InviteFriendPage implements OnInit {

  dataIn = [];
  game:any;
  constructor(public toastController: ToastController, public location: Location,public http: HttpClient) { }

  ngOnInit() {
    this.game = this.location.getState();
    this.getFriends().then(e => {
      this.dataIn = e['friends'];
    })
  }

  getFriends(){
    const url = 'http://quizzyappbackend.herokuapp.com/friends';
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

  invite(nickname){

    console.log(this.game)
    console.log(nickname)
    const url = 'http://quizzyappbackend.herokuapp.com/games/invite';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`});
    let options = { headers : headers};
    return new Promise(resolve => {
      this.http.post(url, {nickname: nickname, rid: this.game.game.rid}, options).subscribe(response => {
        resolve(response);
      }, (error) => {
        console.log(error);
        if(error.status == 409){
          this.failInviteFriendsToast();
        }
      });
    });
  }

  /**
     * @summary function that shows a toast when the user or the password aren't on the base data
     */
   async failInviteFriendsToast() {
    const toast = await this.toastController.create({
      header: 'Amigo ya invitado',
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
