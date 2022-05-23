import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SuggestService {

  constructor(public http: HttpClient, public router: Router, public toastController: ToastController) { }

  suggestQuestion(question, category, difficulty, correctAnswer, 
                  wrongAnswer1, wrongAnswer2, wrongAnswer3){
    
    const url = environment.backendUrl + 'questions/proposal';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'aplication/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`});
    let options = { headers : headers};
    return new Promise(resolve => {
      this.http.post(url, {category: category, statement: question, 
                          difficulty: difficulty, correctAnswer: correctAnswer, 
                          wrongAnswer1: wrongAnswer1, wrongAnswer2: wrongAnswer2, 
                          wrongAnswer3: wrongAnswer3}, 
                          options).subscribe(response => {
        resolve(response);
      }, (error) => {
        console.log(error);
      });
    });
  }
}
