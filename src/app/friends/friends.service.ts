import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ToastController } from '@ionic/angular';

export interface Friend{
  nickname: string;
  actual_cosmetic: number;
}

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(public http: HttpClient, public router: Router, public toastController: ToastController) { }

  getFriends(){
    const url = environment.backendUrl + 'friends';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'aplication/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`});
    let options = { headers : headers};
    return new Promise(resolve => {
      this.http.get(url,options).subscribe(data => {
        //console.log(data);
        resolve(data);
      }, error => {
        console.log(error);
      });
    });
  }

  getRequests(){
    const url = environment.backendUrl + 'friends/pending';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'aplication/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`});
    let options = { headers : headers};
    return new Promise(resolve => {
      this.http.get(url,options).subscribe(data => {
        //console.log(data)
        resolve(data);
      }, error => {
        console.log(error);
      });
    });
  }

  addFriends(nickname){
    const url = environment.backendUrl + 'friends/add';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'aplication/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`});
    let options = { headers : headers};
    return new Promise(resolve => {
      this.http.post(url, {friendNickname: nickname}, options).subscribe(response => {
        resolve(response);
      }, (error) => {
        console.log(error);
        if(error.status == 409){
          this.failAddFriendsToast();
        }
      });
    });
  }

  /**
     * @summary function that shows a toast when the user or the password aren't on the base data
     */
   async failAddFriendsToast() {
    const toast = await this.toastController.create({
      header: 'No se pudo enviar la peticion',
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

  acceptFriend(nickname){
    
    const url = environment.backendUrl + 'friends/accept';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'aplication/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`});
    let options = { headers : headers};
    return new Promise(resolve => {
      this.http.put(url, {friendNickname: nickname}, options).subscribe(response => {
        resolve(response);
      }, (error) => {
        console.log(error);
      });
    });
  }

  deleteFriend(nickname){
    const url = environment.backendUrl + 'friends/delete';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'aplication/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`});
    let options = { headers : headers, body: {friendNickname: nickname}};
    return new Promise(resolve => {
      this.http.delete(url, options).subscribe(response => {
        resolve(response);
      }, (error) => {
        console.log(error);
      });
    });
  }


  searchFriend(nickname){
    const url = environment.backendUrl + 'user/search';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'aplication/json'});
    let params = new HttpParams()
      .set('nickname', nickname)
    let options = { headers : headers, params:params};
    return new Promise(resolve => {
      this.http.get(url, options).subscribe(response => {
        console.log(response);
        resolve(response);
      }, (error) => {
        console.log(error);
      });
    });
  }

}
