import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { product } from '../types/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  api: string = environment.api

  constructor(private http: HttpClient) { }

  getAll(quotationId : number) : Observable<product[]> {
    return this.http.get<product[]>(this.api + 'Product/getall/' + quotationId).pipe();
  }
}
