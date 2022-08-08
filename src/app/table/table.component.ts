import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { OrderService } from '../services/order.service';
import { Order } from '../types/Order';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  orders$: Observable<Order[]> | undefined
  loading:boolean = false;
  list: Order[] = [];
  currentList : Order[] = []
  // Page Start at 0
  currentPage: number = 0;
  numberOfLastPage: number = 0;
  constructor(private orderService: OrderService) { 
  }
  isToggleFilter : boolean = false;

  ngOnInit(): void {
    this.orders$ = this.orderService.getAllOrder();
    this.orders$.subscribe(data => {
      this.list = data
      this.numberOfLastPage = Math.ceil(this.list.length / 20)
      this.setCurrentList();
    })
  }
  
  setNumberOfLastPage () {
    this.numberOfLastPage = Math.ceil(this.list.length / 20)
  }

  setCurrentList() {
    let newList : Order[] = [...this.list]
    this.currentList = newList.slice(this.currentPage * 20, (this.currentPage+1)*20)
    console.log(this.currentList)
  }

  nextPage() {
    if ((this.currentPage + 1) == this.numberOfLastPage) return;
    this.currentPage += 1;
    this.setCurrentList();
  }
  
  previousPage() {
    if (this.currentPage + 1 == 1) return;
    this.currentPage -= 1;
    this.setCurrentList();
  }

  setToLastPage() {
    this.currentPage = this.numberOfLastPage - 1;
    this.setCurrentList();
  }

  setToFirstPage () {
    this.currentPage = 1 - 1;
    this.setCurrentList();
  }
  getStyleStatus(status : string) {
    if (status == "Draft") return "draft-status"
    if (status == "Submit") return "submit-status"
    if (status == "Cancel") return "cancel-status"
    if (status == "CustomerConfirm") return "confirm-status"
    else return ""
  }
  getWord(status : string) {
    let newStatus : string = "";
    const result : string[] = status.split(/(?=[A-Z])/);
    if (result.length == 1) return status
    for (let word of result ){
      newStatus += word;
      newStatus += " ";
    }
    return newStatus.trim();
  }
  openStatusModal (order : Order) {
    order.toggle = !order.toggle;
  }
  toggleFilter() {
    this.isToggleFilter = !this.isToggleFilter;
  }
}
