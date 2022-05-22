import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../friends/friends.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {

  constructor(private friendsService: FriendsService) { }

  requests : any;/*Array<{username: string, img: string}> = [
    { username: 'Darío', img: "../../assets/icon/a.jpg"},
    { username: 'Jaime', img: "../../assets/icon/a.jpg"},
    { username: 'Celia', img: "../../assets/icon/a.jpg"},
    { username: 'Diana', img: "../../assets/icon/a.jpg"},
    { username: 'Mathis', img: "../../assets/icon/a.jpg"}
  ]*/

  accept(nickname) {

    this.friendsService.acceptFriend(nickname);
  }

  reject(nickname) {
    this.friendsService.deleteFriend(nickname);
  }

  ngOnInit() {
    this.requests = [];

    this.friendsService.getRequests().then(e => {
      JSON.parse(JSON.stringify(e["friends"])).forEach(data => {
        this.requests.push(data);
      });
      console.log(this.requests);
    });
  }

}
