/*
 * Author: Celia Mainar
 * Filename: remote-service.service.ts
 * Module: FrontEnd Mobile
 * Description: This is the page about the connection between the API and the Sign-up's page
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RemoteServiceSignUp {

  url= 'http://localhost:5000/user';

  constructor(public http: HttpClient, public toastController: ToastController, public router: Router) { 

  }

  /**
   * 
   * @param data message to send to the API
   * @returns 
   */
  addPost(data){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'aplication/json'});
    let options = { headers : headers};
    return new Promise((resolve,reject) => {
      this.http.post(this.url, JSON.stringify(data),options).subscribe(response => {
        resolve(response);
        this.router.navigate(['/home']);
      }, (error) => {
        if(error.status == 409){
          this.userAlreadyExists();
        }
        reject(error);
      });
    });
  }

  /**
   * Create a Toast, notifying the user, that the name of the user is already in use
   */
  async userAlreadyExists(){
    const toast = await this.toastController.create({
      header: 'Usuario inválido',
      message: 'Nombre de usuario no disponible',
      position: 'top',
      buttons: [
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
