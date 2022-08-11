import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from '../types/Company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  api: string = environment.api;
  constructor(private http: HttpClient) { }
  
  getCompany() : Observable<Company[]> {
    return this.http.get<Company[]>(this.api + 'Company/getall').pipe()
  }
}
