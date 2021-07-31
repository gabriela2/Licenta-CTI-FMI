import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Demand } from '../models/demand';

@Injectable({
  providedIn: 'root'
})
export class DemandsService {

  baseUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }
  post(demand: Demand) {
    return this.http.post(this.baseUrl + 'demands/', demand);
  }
}
