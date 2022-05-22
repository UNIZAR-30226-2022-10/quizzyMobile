import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../friends/friends.service';

@Component({
  selector: 'app-list-friends',
  templateUrl: './list-friends.page.html',
  styleUrls: ['./list-friends.page.scss'],
})
export class ListFriendsPage implements OnInit {

  constructor(private friendsService: FriendsService) { }

  friends: any; // user + idCosm

  cosm(id):string {
    return "../../assets/cosmetics/cosmetic_" + id + ".jpg";
  }

  /*  { username: 'Darío', img: "../../assets/icon/a.jpg"},
    { username: 'Jaime', img: "../../assets/icon/a.jpg"},
    { username: 'Celia', img: "../../assets/icon/a.jpg"},
    { username: 'Diana', img: "../../assets/icon/a.jpg"},
    { username: 'Mathis', img: "../../assets/icon/a.jpg"}
  ]*/

  ngOnInit() {
    this.friends=this.friendsService.getFriends();
  }

}
