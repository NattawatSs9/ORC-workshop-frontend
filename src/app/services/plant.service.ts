import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { plant } from '../types/Plant';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  api: string = environment.api

  constructor(private http: HttpClient) { }

  getAll() : Observable<plant[]> {
    return this.http.get<plant[]>(this.api + "Plant/getall").pipe()
  }
}
