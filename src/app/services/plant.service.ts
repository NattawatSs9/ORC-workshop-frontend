import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  api: string = environment.api

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.api + "Product/getall").pipe()
  }
}
