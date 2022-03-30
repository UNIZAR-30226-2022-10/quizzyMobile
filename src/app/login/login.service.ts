import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  urlUser: string;
  urlLogin: string;
  constructor(public http: HttpClient) { }

  getUser(user: string){
    return this.http.get(this.urlUser);
  }

  userLogin(){
    return this.http.post(this.urlLogin,[]);
  }
}
