import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  api : string = environment.api
  constructor(private http : HttpClient) { }

  getAll(companyId : number){
    return this.http.get(this.api+ "Site/getall/"+companyId).pipe()
  }
}
