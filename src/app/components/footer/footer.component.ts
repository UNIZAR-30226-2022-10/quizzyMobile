import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {}

  moveToShop(){
    this.router.navigate(['shop']);
  }

  moveToInventory(){
    this.router.navigate(['inventory']);
  }

  moveToMenu(){
    this.router.navigate(['initial-menu']);
  }

  moveToFriends(){
    this.router.navigate(['friends']);
  }
}
