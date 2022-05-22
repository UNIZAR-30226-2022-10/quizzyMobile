/*
 * Author: Celia Mainar
 * Filename: login.service.ts
 * Module: FrontEnd Mobile
 * Description: This is the page about the connection between the API and the Login's page
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(public http: HttpClient, public toastController: ToastController, public router: Router) { }

  userLogin(data){
    let url= 'http://quizzyappbackend.herokuapp.com/user/login';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'aplication/json'});
    let options = { headers : headers};
    return new Promise((resolve,reject) => {
      this.http.post(url, data, options ).subscribe(response => {
        localStorage.removeItem("token");
        let myToken = JSON.parse(JSON.stringify(response["token"]));
        localStorage.setItem('token', myToken);
        localStorage.setItem('nickname', data.nickname);
        resolve(response);
        this.router.navigate(['/initial-menu']);
      }, (error) => {
        if(error.status != 200){
          this.userFailToast();
        }
        reject(error);
      });
    });
  }

  /**
   * @summary function that shows a toast when the user or the password aren't on the base data
   */
   async userFailToast() {
    const toast = await this.toastController.create({
      header: 'Usuario o Contraseña incorrectos',
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
