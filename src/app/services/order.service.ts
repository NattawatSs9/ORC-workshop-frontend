import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { AddOrder, Max, Order } from '../types/Order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  api: string = environment.api;
  constructor(private http: HttpClient) { }

  getAllOrder(): Observable<Order[]> {
    return this.http.get<Order[]>(this.api+'Order/getall').pipe()
  }

  addOrder(payload : AddOrder) {
    return this.http.post<string>(this.api+'Order/addorder', payload).pipe()
  }

  getNextNumber() : Observable<Max[]> {
    return this.http.get<Max[]>(this.api + 'Order/getNextNumber').pipe()
  }
}
