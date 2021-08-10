import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Fundraiser } from '../models/fundraiser';
import { PaginatedResult } from '../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class FundraisersService {

  baseUrl = environment.apiUrl;
  paginatedResult: PaginatedResult<Fundraiser[]> = new PaginatedResult<Fundraiser[]>();
  constructor(private http:HttpClient) { }

  getFundraisers(page?: number, itemsPerPage?: number, orderBy?:string) {
    let params = new HttpParams();
    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
      params = params.append('orderBy',orderBy);
    }
    
    return this.http.get<Fundraiser[]>(this.baseUrl + 'fundraisers', { observe: 'response', params }).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;

      }
      ));
  }

  getApprovedFundraiserByUserId(id:number, page?: number, itemsPerPage?: number, orderBy?:string) {
    let params = new HttpParams();
    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
      params = params.append('orderBy',orderBy);
    }
    
    return this.http.get<Fundraiser[]>(this.baseUrl + 'fundraisers/approved/'+id, { observe: 'response', params }).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;

      }
      ));
  }

  getNotApprovedYetFundraiserByUserId(id:number, page?: number, itemsPerPage?: number, orderBy?:string) {
    let params = new HttpParams();
    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
      params = params.append('orderBy',orderBy);
    }
    
    return this.http.get<Fundraiser[]>(this.baseUrl + 'fundraisers/not-approved-yet/'+id, { observe: 'response', params }).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;

      }
      ));
  }

  getRejectedFundraiserByUserId(id:number, page?: number, itemsPerPage?: number, orderBy?:string) {
    let params = new HttpParams();
    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
      params = params.append('orderBy',orderBy);
    }
    
    return this.http.get<Fundraiser[]>(this.baseUrl + 'fundraisers/rejected/'+id, { observe: 'response', params }).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;

      }
      ));
  }

  getFundraiser(id:number){
    return this.http.get<Fundraiser>(this.baseUrl+'fundraisers/'+id);
  }
  getFundraisersByUserId(id:number){
    return this.http.get<Fundraiser[]>(this.baseUrl+'fundraisers/user-fundraisers/'+id);
  }
  put(id: number, fundraiser:Fundraiser) {
    return this.http.put(this.baseUrl + 'fundraisers/' + id, fundraiser);
  }
  post(fundraiser:any) {
    return this.http.post(this.baseUrl + 'fundraisers/', fundraiser);
  }
  setMainPhoto(fundraiserId:number,photoId: number) {
    return this.http.put(this.baseUrl + 'fundraisers/set-main-photo/'+fundraiserId+'/' + photoId, {});
  }
  deletePhoto(fundraiserId:number,photoId: number) {
    return this.http.delete(this.baseUrl + 'fundraisers/delete-photo/'+fundraiserId+'/' + photoId);
  }
}
