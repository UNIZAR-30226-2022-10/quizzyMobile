import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidateQuestionService {

  constructor(public http: HttpClient, public router: Router, public toastController: ToastController) { }

  auth: any = localStorage.getItem('token');

  getPendingQuestions(){
    const url = environment.backendUrl + 'questions/pending';
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

  acceptQuestion(id){
    
    console.log(localStorage.getItem('token'))
    const url = environment.backendUrl + 'questions/review';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.auth}`});
    let params = new HttpParams().set('id', id)
    let options = { headers : headers, params: params};
    return new Promise(resolve => {
      this.http.put(url, {}, options).subscribe(data => {
        resolve(data);
      }, error => {
        console.log(error);
      });
    });
  }

  declineQuestion(id){
    const url = environment.backendUrl + 'questions/review';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.auth}`});
    let params = new HttpParams().set('id', id)
    let options = { headers : headers, params: params};
    return new Promise(resolve => {
      this.http.delete(url,options).subscribe(data => {
        resolve(data);
      }, error => {
        console.log(error);
      });
    });
  }
}
