import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ORC-workshop-frontend';
  toggle: boolean = false;
  toggleSideBar(){
    this.toggle = !this.toggle
  }
}
