import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(public http: HttpClient) { }

  getUser(nickname){
    let url= 'http://quizzyappbackend.herokuapp.com/user/reduced';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'});
    let params = new HttpParams()
        .set('nickname', nickname);
    let options = { headers : headers, params:params};

    return new Promise( (resolve,reject) => {
      this.http.get(url,options).subscribe(data => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }
}

