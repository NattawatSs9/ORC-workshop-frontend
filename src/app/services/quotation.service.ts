import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { quotation } from '../types/Quotation';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {
  api: string = environment.api
  constructor(private http: HttpClient) { }
  
  getAll(siteId : number) : Observable<quotation[]> {
    return this.http.get<quotation[]>(this.api + 'Quotation/getall/' + siteId).pipe()
  }
}
