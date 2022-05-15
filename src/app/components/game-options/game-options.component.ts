import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-options',
  templateUrl: './game-options.component.html',
  styleUrls: ['./game-options.component.scss'],
})
export class GameOptionsComponent implements OnInit {

  constructor(public router: Router) { }
  birthday;
  difficulty=1;

  myGroupItems: Array<{ checked: boolean, text: string, value: string, img: string }> = [
    { checked: false, text: 'Historia', value: '0', img: 'assets/categorias/historia.png' }, 
    { checked: true, text: 'Arte', value: '1', img: 'assets/categorias/arte.png' }, 
    { checked: false, text: 'Geografía', value: '2', img: 'assets/categorias/geografia.png' },
    { checked: false, text: 'Ciencia', value: '3', img: 'assets/categorias/ciencia.png' },
    { checked: true, text: 'Entreten.', value: '4', img: 'assets/categorias/entretenimiento.png' },
    { checked: false, text: 'Deportes', value: '5', img: 'assets/categorias/deportes.png' }
]

  ngOnInit() {}

  segmentChanged(event)
  {
    this.difficulty=event.detail.value;
  }

  categoryChanged(event)
  {
    this.myGroupItems[event.detail.value].checked=event.detail.checked;
    console.log(event.detail.value);
  }

  cat():boolean {
    console.log(this.myGroupItems[0].checked || this.myGroupItems[1].checked || 
      this.myGroupItems[2].checked || this.myGroupItems[3].checked ||
      this.myGroupItems[4].checked || this.myGroupItems[5].checked);
    return !(this.myGroupItems[0].checked || this.myGroupItems[1].checked || 
            this.myGroupItems[2].checked || this.myGroupItems[3].checked ||
            this.myGroupItems[4].checked || this.myGroupItems[5].checked)  
  }

  onClick() {
    this.router.navigate(['/question'])
  }

}
