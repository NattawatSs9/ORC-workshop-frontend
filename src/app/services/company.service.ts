import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  api: string = environment.api;
  constructor(private http: HttpClient) { }
  
  getCompany() {
    return this.http.get(this.api + 'Company/getall').pipe()
  }
}
