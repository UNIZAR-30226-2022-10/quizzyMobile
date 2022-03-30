/*
 * Author: Celia Mainar
 * Filename: login.page.ts
 * Module: FrontEnd Mobile
 * Description: This is the page about the login of the system on mobile
 */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import * as bcrypt from 'bcryptjs';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: any;
  salt: string;
  hash: string;

  formLogin = new FormGroup({
    name: new  FormControl('',[Validators.required] ),
    password: new FormControl('',[Validators.required])
  });

  constructor(public serv: LoginService, public toastController: ToastController) { }

  ngOnInit() {
  }

  login(){
    this.serv.getUser(this.formLogin.controls.name.value)
    .subscribe(
      (data) => {this.user = data;},
      (error) => {console.log(error);}
    );
    if(this.user != null){
      console.log('superado');
      if(this.checkPassword(this.formLogin.controls.password.value,this.user.password)){
        console.log('contraseña buena');
        this.serv.userLogin();
      } else{
        this.passwordFailToast();
      }
    } else {
      this.userFailToast();
    }
  }

  /**
   * @summary function that shows a toast when the user isn't in the database
   */
  async userFailToast() {
    const toast = await this.toastController.create({
      header: 'Usuario incorrecto',
      message: 'Porfavor revise el nombre o registrase en la aplicación para poder acceder',
      position: 'middle',
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

  async passwordFailToast() {
    const toast = await this.toastController.create({
      header: 'Contraseña incorrecta',
      message: 'Porfavor revise la contraseña',
      position: 'middle',
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
  onResetForm(){
    this.formLogin.reset();
  }

  /**
   * @summary This function validates that the password of the form is the same as the one saved
   * @param passwordGiven
   * @param passwordSaved
   * @returns boolean
   */
  private checkPassword = (passwordGiven: string, passwordSaved: string): boolean => {
    this.salt = bcrypt.genSaltSync(10);
    this.hash = bcrypt.hashSync(passwordGiven,this.salt);
    return this.hash === passwordSaved;
  };
}
