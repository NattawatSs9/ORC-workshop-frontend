import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../types/Order';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Input() Order! : Order | undefined;
  constructor() { }

  ngOnInit(): void {
  }

  
}
