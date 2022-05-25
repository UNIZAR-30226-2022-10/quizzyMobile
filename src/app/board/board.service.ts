import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(public http: HttpClient) { }

  getUser(nickname){
    const url = environment.backendUrl + 'user' + nickname;
    const headers = new HttpHeaders ({
      'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    let options = {headers : headers};

    return new Promise( (resolve,reject) => {
      this.http.get(url,options).subscribe(data => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }
}
