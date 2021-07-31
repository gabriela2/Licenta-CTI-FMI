import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<Category[]>(this.baseUrl + 'categories');
  }
  getCategory(id: number) {
    return this.http.get<Category>(this.baseUrl + 'categories/' + id);
  }
  post(category: Category) {
    return this.http.post(this.baseUrl + 'categories/', category);
  }
  put(id: number, category: Category) {
    return this.http.put(this.baseUrl + 'categories/' + id, category);
  }
  delete(id:number){
    return this.http.delete(this.baseUrl+'categories/'+id);
  }
}
