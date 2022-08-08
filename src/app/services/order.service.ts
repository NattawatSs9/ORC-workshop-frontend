import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Order } from '../types/Order';
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
}
