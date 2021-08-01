import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ad } from 'src/app/models/ad';
import { Address } from 'src/app/models/address';
import { Fundraiser } from 'src/app/models/fundraiser';
import Member from 'src/app/models/member';
import { UserRating } from 'src/app/models/userRating';
import { AddressesService } from 'src/app/services/addresses.service';
import { AdsService } from 'src/app/services/ads.service';
import { FundraisersService } from 'src/app/services/fundraisers.service';
import { MembersService } from 'src/app/services/members.service';
import { UserRatingsService } from 'src/app/services/user-ratings.service';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.css']
})
export class MemberProfileComponent implements OnInit {
  userId:number;
  member:Member;
  address:Address;
  phoneNumber: string = "Suna utilizatorul";
  ads:Ad[];
  fundraisers:Fundraiser[];
  ratings:UserRating[];



  constructor(
    private route: ActivatedRoute, 
    private memberService: MembersService,
    private addressService:AddressesService,
    private adsService: AdsService,
    private fundraisersService:FundraisersService,
    private ratingsService:UserRatingsService
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    })
    console.log("this.userId = ", this.userId);
    this.loadMember();
    this.loadAds();
    this.loadFundraisers();
    this.loadRatings();
  }

  showPhoneNumber() {
    this.phoneNumber = this.member.phoneNumber;
  }

  loadAddress() {
    this.addressService.getAddressByUserId(this.userId).subscribe(address => {
      this.address = address;
      console.log("this.address = ", this.address);
    })
  }

  loadMember(){
    this.memberService.getMember(this.userId).subscribe(response=>{
      this.member=response;
      console.log(this.member);
    })
    this.loadAddress();
  }

  loadAds(){
    this.adsService.getAdsByUserId(this.userId).subscribe(response=>{
      this.ads=response;
      console.log("this.ads=",this.ads);
    })
  }

  loadFundraisers(){
    this.fundraisersService.getFundraisersByUserId(this.userId).subscribe(response=>{
      this.fundraisers=response;
      console.log("this.fundraisers=",this.fundraisers);
    })
  }

  loadRatings(){
    this.ratingsService.getUserRatingsByReceiverId(this.userId).subscribe(response =>{
      this.ratings = response;
      console.log("this.ratings=",this.ratings);
    }
    )
  }

}
