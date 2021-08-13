import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';
import { DeliveryType } from '../models/deliveryType';
import { Fundraiser } from '../models/fundraiser';
import { PaginatedResult } from '../models/pagination';
import { UnitOfMeasure } from '../models/unitOfMeasure';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;
  paginatedResult: PaginatedResult<Fundraiser[]> = new PaginatedResult<Fundraiser[]>();

  constructor(private http:HttpClient) { }

  getRolesForUsers(){
    return this.http.get<Partial<User[]>>(this.baseUrl+'admin/get-roles-for-users');
  }
  editUserRoles(id: number, roles: string[]) {
    return this.http.post(this.baseUrl + 'admin/edit-user-roles/' + id + '?roles=' + roles, {});
  }

  postCategory(category: Category) {
    return this.http.post(this.baseUrl + 'admin/category', category);
  }
  putCategory(id: number, category: Category) {
    return this.http.put(this.baseUrl + 'admin/category/' + id, category);
  }
  deleteCategory(id:number){
    return this.http.delete(this.baseUrl+'admin/category/'+id);
  }

  postDeliveryType(deliveryType: DeliveryType) {
    return this.http.post(this.baseUrl + 'admin/delivery-type', deliveryType);
  }
  putDeliveryType(id: number, deliveryType: DeliveryType) {
    return this.http.put(this.baseUrl + 'admin/delivery-type/' + id, deliveryType);
  }
  deleteDeliveryType(id:number){
    return this.http.delete(this.baseUrl+'admin/delivery-type/'+id);
  }


  postUnitOfMeasure(unitOfMeasure: UnitOfMeasure) {
    return this.http.post(this.baseUrl + 'admin/unit-of-measure', unitOfMeasure);
  }
  putUnitOfMeasure(id: number, unitOfMeasure: UnitOfMeasure) {
    return this.http.put(this.baseUrl + 'admin/unit-of-measure/' + id, unitOfMeasure);
  }
  deleteUnitOfMeasure(id:number){
    return this.http.delete(this.baseUrl+'admin/unit-of-measure/'+id);
  }

  getInactiveFundraisers(page?: number, itemsPerPage?: number, orderBy?:string) {
    let params = new HttpParams();

    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
      params = params.append('orderBy',orderBy);
    }
    
    return this.http.get<Fundraiser[]>(this.baseUrl+'admin/get-all-inactive-fundraisers', { observe: 'response', params }).pipe(
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
