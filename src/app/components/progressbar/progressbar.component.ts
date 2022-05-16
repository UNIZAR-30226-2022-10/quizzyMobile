import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss'],
})
export class ProgressbarComponent implements OnInit {

  constructor() { }
  partida = 15;
  time = this.partida;
  timeleft = this.partida; 
  ngOnInit() {
    this.Showprogress();
  } 
  progress = 100;  
 Showprogress()  
 {  
   this.progress = 100;  
   var downloadTimer = setInterval(() => this.ProgressBar(), 100);
   setInterval(() => clearInterval(downloadTimer), this.partida*1000 + 100);
   }  
  
 ProgressBar() {
   this.progress = 100*(this.timeleft/this.time);
   this.timeleft = this.timeleft-0.1;  
 }  
}
