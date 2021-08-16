import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Message } from '../models/message';
import { PaginatedResult } from '../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  baseUrl = environment.apiUrl;
  paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<Message[]>();
  constructor(private http:HttpClient) { }

  getMessagesByUserId(id:number, page?: number, itemsPerPage?: number, type?:string) {
    let params = new HttpParams();
    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
      params = params.append('type',type);
  }
    
    return this.http.get<Message[]>(this.baseUrl + 'messages/'+id, { observe: 'response', params }).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;

      }
      ));
  }

  getMessagesBetweenCurrentUserAndReceiver(currentUserId:number, participantUserId:number){
    return this.http.get<Message[]>(this.baseUrl+'messages/chat/'+currentUserId+'/'+participantUserId);
  }

  addMessage(message:Message){
    return this.http.post<Message>(this.baseUrl+'messages',message);
  }



}
