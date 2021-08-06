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
  delete(id:number){
    return this.http.delete(this.baseUrl+'demands/'+id);
  }
  put(id: number, demand: Demand) {
    return this.http.put(this.baseUrl + 'demands/' + id, demand);
  }
  getDemandsByUserId(id:number){
    return this.http.get<Demand[]>(this.baseUrl+'demans/get-by-user/'+id);
  }
  getDemandsByAdId(id:number){
    return this.http.get<Demand[]>(this.baseUrl+'demans/get-by-ad/'+id);
  }
}
