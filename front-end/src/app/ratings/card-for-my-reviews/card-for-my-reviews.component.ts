import { Component, Input, OnInit } from '@angular/core';
import { Address } from 'src/app/models/address';
import Member from 'src/app/models/member';
import { UserRating } from 'src/app/models/userRating';
import { AddressesService } from 'src/app/services/addresses.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-card-for-my-reviews',
  templateUrl: './card-for-my-reviews.component.html',
  styleUrls: ['./card-for-my-reviews.component.css']
})
export class CardForMyReviewsComponent implements OnInit {

  @Input() userRating:UserRating;
  receiver:Member;
  addressReceiver:Address;
  constructor(
    private memberService:MembersService,
    private addressService:AddressesService,
  ) { }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    this.memberService.getMember(this.userRating.receiverId).subscribe(response=>{
      this.receiver = response;
      this.loadAddressReceiver(this.receiver.id);
    });

  }

  loadAddressReceiver(id:number){
    this.addressService.getAddressByUserId(id).subscribe(response=>{
      this.addressReceiver=response;
    })
  }
  
}
