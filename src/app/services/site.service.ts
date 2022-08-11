import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { site } from '../types/Site';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  api : string = environment.api
  constructor(private http : HttpClient) { }

  getAll(companyId : number) : Observable<site[]>{
    return this.http.get<site[]>(this.api+ "Site/getall/"+companyId).pipe()
  }
}
