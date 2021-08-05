import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UnitOfMeasure } from '../models/unitOfMeasure';

@Injectable({
  providedIn: 'root'
})
export class UnitsOfMeasureService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getUnitsOfMeasure() {
    return this.http.get<UnitOfMeasure[]>(this.baseUrl + 'unitsOfMeasure');
  }
  getUnitOfMeasure(id: number) {
    return this.http.get<UnitOfMeasure>(this.baseUrl + 'unitsOfMeasure/' + id);
  }
  post(unitOfMeasure: UnitOfMeasure) {
    return this.http.post(this.baseUrl + 'unitsOfMeasure/', unitOfMeasure);
  }
  put(id: number, unitOfMeasure: UnitOfMeasure) {
    return this.http.put(this.baseUrl + 'unitsOfMeasure/' + id, unitOfMeasure);
  }
  delete(id:number){
    return this.http.delete(this.baseUrl+'unitsOfMeasure/'+id);
  }
}
