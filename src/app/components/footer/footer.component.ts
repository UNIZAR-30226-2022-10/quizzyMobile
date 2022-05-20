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

  moveToHome(){
    this.router.navigate(['home']);
  }
}
