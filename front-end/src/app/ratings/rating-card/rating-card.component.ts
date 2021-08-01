import { Component, Input, OnInit } from '@angular/core';
import Member from 'src/app/models/member';
import { UserRating } from 'src/app/models/userRating';
import { MembersService } from 'src/app/services/members.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-rating-card',
  templateUrl: './rating-card.component.html',
  styleUrls: ['./rating-card.component.css']
})
export class RatingCardComponent implements OnInit {

  @Input() rating:UserRating;
  sender:Member;
  flag=false;

  constructor(private memberService:MembersService) { }

  ngOnInit(): void {
    this.loadSenderUser();
  }


  loadSenderUser(){
    this.memberService.getMember(this.rating.senderId).subscribe(response=>{
      this.sender=response;
      console.log(this.sender);
      if(this.sender.id==parseInt(localStorage.getItem('userId'))){
        this.flag=true;
      }
    })
  }



}
