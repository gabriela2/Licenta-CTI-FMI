import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Ad } from '../models/ad';
import { PaginatedResult } from '../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  baseUrl = environment.apiUrl;
  paginatedResult: PaginatedResult<Ad[]> = new PaginatedResult<Ad[]>();
  constructor(private http: HttpClient) { }

  getAds(page?: number, itemsPerPage?: number, categoryId?: number, orderBy?:string) {
    let params = new HttpParams();
    if (page !== null && itemsPerPage !== null && categoryId !== 0) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
      params = params.append('categoryId', categoryId.toString());
      params = params.append('orderBy',orderBy);
    }

    if (page !== null && itemsPerPage !== null && categoryId === 0) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
      params = params.append('orderBy',orderBy);
    }
    
    return this.http.get<Ad[]>(this.baseUrl + 'ads', { observe: 'response', params }).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;

      }
      ));
  }


  getActiveAdsByUserId(id:number, page?: number, itemsPerPage?: number, categoryId?: number, orderBy?:string) {
    let params = new HttpParams();
    if (page !== null && itemsPerPage !== null && categoryId !== 0) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
      params = params.append('categoryId', categoryId.toString());
      params = params.append('orderBy',orderBy);
    }

    if (page !== null && itemsPerPage !== null && categoryId === 0) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
      params = params.append('orderBy',orderBy);
    }
    
    return this.http.get<Ad[]>(this.baseUrl + 'ads/active/'+id, { observe: 'response', params }).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;

      }
      ));
  }


  getInactiveAdsByUserId(id:number, page?: number, itemsPerPage?: number, categoryId?: number, orderBy?:string) {
    let params = new HttpParams();
    if (page !== null && itemsPerPage !== null && categoryId !== 0) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
      params = params.append('categoryId', categoryId.toString());
      params = params.append('orderBy',orderBy);
    }

    if (page !== null && itemsPerPage !== null && categoryId === 0) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
      params = params.append('orderBy',orderBy);
    }
    
    return this.http.get<Ad[]>(this.baseUrl + 'ads/inactive/'+id, { observe: 'response', params }).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;

      }
      ));
  }


  getAdsByUserId(id:number){
    return this.http.get<Ad[]>(this.baseUrl+'ads/user-id/'+id);
  }


  getAd(id: number) {
    return this.http.get<Ad>(this.baseUrl + 'ads/' + id);
  }
  
  put(id: number, ad: Ad) {
    return this.http.put(this.baseUrl + 'ads/' + id, ad);
  }
  post(ad: any) {
    return this.http.post(this.baseUrl + 'ads', ad);
  }
  setMainPhoto(adId: number, photoId: number) {
    return this.http.put(this.baseUrl + 'ads/set-main-photo/' + adId + '/' + photoId, {});
  }
  deletePhoto(adId: number, photoId: number) {
    return this.http.delete(this.baseUrl + 'ads/delete-photo/' + adId + '/' + photoId);
  }

  deleteAd(adId:number){
    return this.http.delete(this.baseUrl+'ads/'+adId);
  }



  getRejectedAdsByUserId(id:number, page?: number, itemsPerPage?: number, categoryId?: number, orderBy?:string) {
    let params = new HttpParams();
    if (page !== null && itemsPerPage !== null && categoryId !== 0) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
      params = params.append('categoryId', categoryId.toString());
      params = params.append('orderBy',orderBy);
    }

    if (page !== null && itemsPerPage !== null && categoryId === 0) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
      params = params.append('orderBy',orderBy);
    }
    
    return this.http.get<Ad[]>(this.baseUrl + 'ads/rejected-ads/'+id, { observe: 'response', params }).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;

      }
      ));
  }

  getNotApprovedYetAdsByUserId(id:number, page?: number, itemsPerPage?: number, categoryId?: number, orderBy?:string) {
    let params = new HttpParams();
    if (page !== null && itemsPerPage !== null && categoryId !== 0) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
      params = params.append('categoryId', categoryId.toString());
      params = params.append('orderBy',orderBy);
    }

    if (page !== null && itemsPerPage !== null && categoryId === 0) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
      params = params.append('orderBy',orderBy);
    }
    
    return this.http.get<Ad[]>(this.baseUrl + 'ads/not-approved-yet-ads/'+id, { observe: 'response', params }).pipe(
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
