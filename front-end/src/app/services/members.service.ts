import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Member from '../models/member';



@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  getMembers(){
    return this.http.get<Member[]>(this.baseUrl+'users');
  }
  getMember(id:number){
    return this.http.get<Member>(this.baseUrl+'users/'+id);
  }
  
  
  updateMemberProfile(id:number, member:Member){
    return this.http.put(this.baseUrl + 'users/update-profile/' + id, member);
  }
  updateMemberBankDetails(id:number, member:Member){
    return this.http.put(this.baseUrl + 'users/update-bank/' + id, member);
  }
  updateMemberStripeAccess(id:number, member:Member){
    return this.http.put(this.baseUrl + 'users/update-stripe-access/' + id, member);
  }
  updateMemberStripeDetails(id:number, member:Member){
    return this.http.put(this.baseUrl + 'users/update-stripe-details/' + id, member);
  }
  deletePhoto() {
    return this.http.delete(this.baseUrl + 'users/delete-photo/');
  }
}
