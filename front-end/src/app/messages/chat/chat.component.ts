import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import Member from 'src/app/models/member';
import { Message } from 'src/app/models/message';
import { MembersService } from 'src/app/services/members.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() userId: number;
  @ViewChild('messageForm') messageForm:NgForm;
  messages: Message[];
  currentUserId: number;
  member: Member;
  currentUser: Member;
  messageContent: string;

  constructor(private messageService: MessageService, private memberService: MembersService) {
    this.currentUserId = parseInt(localStorage.getItem('userId'));
  }

  ngOnInit(): void {
    this.getMessages();
    this.getMember();
  }
  sendMessage() {
    let message = {
      id: 0,
      text: this.messageContent,
      createdAt: new Date(),
      readAt: null,
      deletedBySender: false,
      deletedByReceiver: false,
      senderId: this.currentUserId,
      receiverId: this.userId,
      senderLastName: this.currentUser.lastName,
      senderFirstName: this.currentUser.firstName,
      receiverLastName: this.member.lastName,
      receiverFirstName: this.member.firstName
    };

    this.messageService.addMessage(message).subscribe(message=>{
      this.messages.push(message);
      this.messageForm.reset();
    })


  }

  getMember() {
    this.memberService.getMember(this.userId).subscribe(response => {
      this.member = response;
    })
    this.memberService.getMember(this.currentUserId).subscribe(response => {
      this.currentUser = response;
    })

  }
  getMessages() {
    this.messageService.getMessagesBetweenCurrentUserAndReceiver(this.currentUserId, this.userId).subscribe(response => {
      this.messages = response;
    })
  }

}
