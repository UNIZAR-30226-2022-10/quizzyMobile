import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../friends/friends.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {

  constructor(private friendsService: FriendsService) { }

  requets : any;/*Array<{username: string, img: string}> = [
    { username: 'Darío', img: "../../assets/icon/a.jpg"},
    { username: 'Jaime', img: "../../assets/icon/a.jpg"},
    { username: 'Celia', img: "../../assets/icon/a.jpg"},
    { username: 'Diana', img: "../../assets/icon/a.jpg"},
    { username: 'Mathis', img: "../../assets/icon/a.jpg"}
  ]*/

  accept(event) {
    this.friendsService.acceptFriend(event.detail.username);
  }

  reject(event) {
    this.friendsService.deleteFriend(event.detail.username);
  }

  ngOnInit() {
    this.requets = this.friendsService.getRequests();
  }

}
