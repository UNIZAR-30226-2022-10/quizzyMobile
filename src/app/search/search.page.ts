import { Component, OnInit, ViewChild } from '@angular/core';
import { FriendsService } from '../friends/friends.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(private friendsService: FriendsService) { }

  friends: any;
  nickname = localStorage.getItem('nickname');
  beforeFriends: any;


  ngOnInit() {
  }

  getUsername(event)
  {
    this.friends = [];
    this.beforeFriends = [];

    this.friendsService.getFriends().then(e => {
      JSON.parse(JSON.stringify(e["friends"])).forEach(data => {
        this.beforeFriends.push(data);
      });
    });

    //console.log(event.target.value)
    this.friendsService.searchFriend(event.target.value).then(e => {
      JSON.parse(JSON.stringify(e["results"])).forEach(data => {
        this.friends.push(data);
      });
      console.log(this.friends);
    });
  }

  request(nickname)
  {
    this.friendsService.addFriends(nickname);
  }

  disableButton(nickname){
    let inFriends = false;

    this.beforeFriends.forEach(e => {
      if(e.nickname == nickname){
        inFriends = true;
      }
    });

    return inFriends;
  }

}
