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


  ngOnInit() {
  }

  getUsername(event)
  {
    //console.log(event.target.value)
    this.friends = this.friendsService.searchFriend(event.target.value);
  }

  request(event)
  {
    this.friendsService.addFriends(event.detail.value);
  }

}
