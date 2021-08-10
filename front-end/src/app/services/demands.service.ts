import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Demand } from '../models/demand';
import { PaginatedResult } from '../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class DemandsService {

  baseUrl = environment.apiUrl;
  paginatedResult: PaginatedResult<Demand[]> = new PaginatedResult<Demand[]>();
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

  getApprovedDemandsByUserId(id:number, page?: number, itemsPerPage?: number, orderBy?:string) {
    let params = new HttpParams();
    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
      params = params.append('orderBy',orderBy);
    }
    
    return this.http.get<Demand[]>(this.baseUrl + 'demands/approved-by-user-id/'+id, { observe: 'response', params }).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;

      }
      ));
  }


  getNotApprovedYetDemandsByUserId(id:number, page?: number, itemsPerPage?: number, orderBy?:string) {
    let params = new HttpParams();
    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
      params = params.append('orderBy',orderBy);
    }
    
    return this.http.get<Demand[]>(this.baseUrl + 'demands/not-approved-yet-by-user-id/'+id, { observe: 'response', params }).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;

      }
      ));
  }
  getRejectedDemandsByUserId(id:number, page?: number, itemsPerPage?: number, orderBy?:string) {
    let params = new HttpParams();
    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
      params = params.append('orderBy',orderBy);
    }
    
    return this.http.get<Demand[]>(this.baseUrl + 'demands/rejected-by-user-id/'+id, { observe: 'response', params }).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;

      }
      ));
  }


  getUnapprovedDemandsByAdId(id:number, page?: number, itemsPerPage?: number, orderBy?:string) {
    let params = new HttpParams();
    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
      params = params.append('orderBy',orderBy);
    }
    
    return this.http.get<Demand[]>(this.baseUrl + 'demands/unapproved-by-ad-id/'+id, { observe: 'response', params }).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;

      }
      ));
  }


  getAllDemandsByAdId(id:number, page?: number, itemsPerPage?: number, orderBy?:string, sortBy?:string, deliveryTypeSelected?:string) {
    let params = new HttpParams();
    if (page !== null && itemsPerPage !== null && deliveryTypeSelected!=='toate' ) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
      params = params.append('orderBy',orderBy);
      params = params.append('sortBy',sortBy);
      params = params.append('deliveryTypeSelected',deliveryTypeSelected);
    }
    if (page !== null && itemsPerPage !== null && deliveryTypeSelected==='toate' ) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
      params = params.append('orderBy',orderBy);
      params = params.append('sortBy',sortBy);
    }

    
    
    
    return this.http.get<Demand[]>(this.baseUrl + 'demands/all-by-ad-id/'+id, { observe: 'response', params }).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;

      }
      ));
  }



  
  
}
