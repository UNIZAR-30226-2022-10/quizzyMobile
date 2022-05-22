import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface Friend{
  nickname: string;
  actual_cosmetic: number;
}

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(public http: HttpClient, public router: Router) { }

  getFriends(){
    const url = environment.backendUrl + 'friends';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'aplication/json'});
    let options = { headers : headers};
    return new Promise(resolve => {
      this.http.get(url,options).subscribe(data => {
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
      'Accept': 'aplication/json'});
    let options = { headers : headers};
    return new Promise(resolve => {
      this.http.get(url,options).subscribe(data => {
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
      'Accept': 'aplication/json'});
    let options = { headers : headers};
    return new Promise(resolve => {
      this.http.post(url, JSON.stringify(nickname), options).subscribe(response => {
        resolve(response);
      }, (error) => {
        console.log(error);
      });
    });
  }

  acceptFriend(nickname){
    const url = environment.backendUrl + 'friends/accept';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'aplication/json'});
    let options = { headers : headers};
    return new Promise(resolve => {
      this.http.put(url, JSON.stringify(nickname), options).subscribe(response => {
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
      'Accept': 'aplication/json'});
    let options = { headers : headers, data: {nickname}};
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
        resolve(response);
      }, (error) => {
        console.log(error);
      });
    });
  }

}
