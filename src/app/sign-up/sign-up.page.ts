/*
 * Author: Celia Mainar
 * Filename: sign-up.page.ts
 * Module: FrontEnd Mobile
 * Description: This is the page about the sign-up of the system on mobile
 */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as bcrypt from 'bcryptjs';
import { RemoteServiceSignUp } from './remote-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  salt: string;
  hash: string;
  arrayPost: any;
  promise: any;

  formSignUp = new FormGroup({
      name: new FormControl('',[Validators.required, Validators.maxLength(20)]),
      email: new FormControl('', [Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('',[Validators.required,Validators.minLength(8)])
    });

  constructor(public postService: RemoteServiceSignUp) { }
  ngOnInit() {
  }

  signUp(){
    if(this.passwordMatch(this.formSignUp.controls.password.value, this.formSignUp.controls.confirmPassword.value)){
      this.salt = bcrypt.genSaltSync(10);
      this.hash = bcrypt.hashSync(this.formSignUp.controls.password.value, this.salt);
      this.arrayPost = [this.formSignUp.controls.name.value, this.formSignUp.controls.email.value, this.hash];
      this.promise = this.postService.addPost(this.arrayPost);
    }
  }

  onResetForm(){
    this.formSignUp.reset();
  }

  /**
   *
   * @param {string} password The password to validate
   * @returns {Number} The strength of the password
   *  - 0 for bad passwords
   *  - 1 for weak passwords
   *  - 2 for medium passwords
   *  - 3 for strong passwords
   */

  validatePassword(password: string): number{

    // at least 8 characters
    const regexPasswordWeak = /^.{8,}$/;

    // At least one lowercase, one uppercase, one number. At least 8 characters
    const regexPasswordMedium = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

    // At least one lowercase, one uppercase, one number and one special symbol. At least 8 characters
    const regexPasswordStrong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[_\-!@#$&*])(?=.*[0-9]).{8,}$/;

    if ( regexPasswordStrong.test(password) ) {
      return 3;
    } else if ( regexPasswordMedium.test(password) ) {
      return 2;
    } else if ( regexPasswordWeak.test(password) ) {
      return 1;
    } else {
      return 0;
    }
  };
/**
 * @summary This function validates that password and confirmPassword are the same string
 * @param password
 * @param confirmPassword
 * @returns boolean
 */
private passwordMatch = (password: string, confirmPassword: string): boolean => {
  if (password === confirmPassword) {
    return true;
  } else {
    return false;
  }
};
}
