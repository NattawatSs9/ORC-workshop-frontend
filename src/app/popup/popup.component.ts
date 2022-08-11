import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Order } from '../types/Order';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Input() responseMessage : string | undefined;
  @Input() errorMessage: string = "";
  @Output() toggleComponent = new EventEmitter();
  toggle : boolean = true
  constructor() { }

  ngOnInit(): void {
  }

  toggleOverlay() {
    this.toggleComponent.emit();
  }
}
