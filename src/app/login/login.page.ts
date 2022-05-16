/*
 * Author: Celia Mainar
 * Filename: login.page.ts
 * Module: FrontEnd Mobile
 * Description: This is the page about the login of the system on mobile
 */
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import * as bcrypt from 'bcryptjs';
import { Router } from '@angular/router';


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

  constructor(public serv: LoginService, public platform: Platform, public router: Router) { 
    this.platform.backButton.subscribeWithPriority(100, () => {
      this.router.navigate(['/home']);
    });
  }

  ngOnInit() {
  }

  login(){
    let arrayPost = {
      nickname: this.formLogin.controls.name.value, 
      password: this.formLogin.controls.password.value};
    this.serv.userLogin(arrayPost);

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
