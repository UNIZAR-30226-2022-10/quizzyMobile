import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RemoteServiceSignUp {

  url: string;
  constructor(public http: HttpClient) { }

  addPost(data){
    return new Promise((resolve,reject) => {
      this.http.post(this.url, JSON.stringify(data)).subscribe(response => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }
}
