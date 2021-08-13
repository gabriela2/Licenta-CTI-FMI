import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Donation } from '../models/donation';
import { PaginatedResult } from '../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class DonationsService {

  baseUrl = environment.apiUrl;
  paginatedResult: PaginatedResult<Donation[]> = new PaginatedResult<Donation[]>();
  constructor(private http:HttpClient) { }

  
  post(donation: Donation) {
    return this.http.post(this.baseUrl + 'donations/', donation);
  }

  getDonationsByUserId(id:number, page?: number, itemsPerPage?: number, orderBy?:string) {
    let params = new HttpParams();
    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
      params = params.append('orderBy',orderBy);
    }
    
    return this.http.get<Donation[]>(this.baseUrl + 'donations/'+id, { observe: 'response', params }).pipe(
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
