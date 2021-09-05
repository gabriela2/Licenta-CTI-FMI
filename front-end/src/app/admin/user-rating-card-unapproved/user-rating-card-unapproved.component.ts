import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/models/address';
import { Fundraiser } from 'src/app/models/fundraiser';
import Member from 'src/app/models/member';
import { UserRating } from 'src/app/models/userRating';
import { AddressesService } from 'src/app/services/addresses.service';
import { FundraisersService } from 'src/app/services/fundraisers.service';
import { MembersService } from 'src/app/services/members.service';
import { UserRatingsService } from 'src/app/services/user-ratings.service';

@Component({
  selector: 'app-user-rating-card-unapproved',
  templateUrl: './user-rating-card-unapproved.component.html',
  styleUrls: ['./user-rating-card-unapproved.component.css']
})
export class UserRatingCardUnapprovedComponent implements OnInit {

  @Input() userRating:UserRating;
  sender:Member;
  addressSender:Address;
  receiver:Member;
  addressReceiver:Address;
  constructor(
    private memberService:MembersService,
    private toastr:ToastrService,
    private userRatingService: UserRatingsService,
    private addressService:AddressesService,
  ) { }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    this.memberService.getMember(this.userRating.senderId).subscribe(response=>{
      this.sender = response;
      this.loadAddressSender(this.sender.id);
    });
    this.memberService.getMember(this.userRating.receiverId).subscribe(response=>{
      this.receiver = response;
      this.loadAddressReceiver(this.receiver.id);
    });

  }

  loadAddressSender(id:number){
    this.addressService.getAddressByUserId(id).subscribe(response=>{
      this.addressSender=response;
    })
  }

  loadAddressReceiver(id:number){
    this.addressService.getAddressByUserId(id).subscribe(response=>{
      this.addressReceiver=response;
    })
  }
  reject(){
    this.userRating.isValidated=true;
    this.userRating.isRejected=true;
    this.userRatingService.put(this.userRating.id, this.userRating).subscribe();
    this.toastr.info("Review-ul a fost respins!")
    window.location.reload();
  }
  approve(){
    this.userRating.isValidated=true;
    this.userRating.isRejected=false;
    this.userRatingService.put(this.userRating.id, this.userRating).subscribe();
    this.toastr.info("Review-ul a fost acceptat!")
    window.location.reload();

  }
}
