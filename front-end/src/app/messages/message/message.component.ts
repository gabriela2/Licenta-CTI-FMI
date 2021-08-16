import { Component, OnInit } from '@angular/core';
import Member from 'src/app/models/member';
import { Message } from 'src/app/models/message';
import { Pagination } from 'src/app/models/pagination';
import { MembersService } from 'src/app/services/members.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messagesUnread:Message[];
  messagesSent:Message[];
  messagesReceived:Message[];
  paginationUnread:Pagination;
  paginationSent:Pagination;
  paginationReceived:Pagination;
  pageNumberUnread=1;
  pageNumberSent=1;
  pageNumberReceived=1;
  pageSize=10;
  type:string;
  currentUserLogged:number;
  member:Member;
  constructor(private messageService:MessageService) { }

  ngOnInit(): void {
    this.currentUserLogged=parseInt(localStorage.getItem('userId'));
    this.getMessagesUnread();
    this.getMessagesSent();
    this.getMessagesReceived();
  }

  getMessagesUnread(){
    this.type="Unread";
    this.messageService.getMessagesByUserId(this.currentUserLogged,this.pageNumberUnread,this.pageSize,this.type).subscribe(response=>{
      this.messagesUnread=response.result;
      this.paginationUnread = response.pagination;
    })
  }
  getMessagesSent(){
    this.type="Sent";
    this.messageService.getMessagesByUserId(this.currentUserLogged,this.pageNumberSent,this.pageSize,this.type).subscribe(response=>{
      this.messagesSent=response.result;
      this.paginationSent = response.pagination;
    })
  }
  getMessagesReceived(){
    this.type="Received";
    this.messageService.getMessagesByUserId(this.currentUserLogged,this.pageNumberReceived,this.pageSize,this.type).subscribe(response=>{
      this.messagesReceived=response.result;
      this.paginationReceived = response.pagination;
    })
  }

  pageChangedUnread(event:any){
    this.pageNumberUnread=event.page;
    this.getMessagesUnread();
  }

  pageChangedSent(event:any){
    this.pageNumberSent=event.page;
    this.getMessagesSent();
  }

  pageChangedReceived(event:any){
    this.pageNumberReceived=event.page;
    this.getMessagesReceived();
  }


}
