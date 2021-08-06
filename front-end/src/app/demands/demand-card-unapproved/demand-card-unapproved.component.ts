import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ad } from 'src/app/models/ad';
import { Address } from 'src/app/models/address';
import { Demand } from 'src/app/models/demand';
import Member from 'src/app/models/member';
import { AddressesService } from 'src/app/services/addresses.service';
import { AdsService } from 'src/app/services/ads.service';
import { DemandsService } from 'src/app/services/demands.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-demand-card-unapproved',
  templateUrl: './demand-card-unapproved.component.html',
  styleUrls: ['./demand-card-unapproved.component.css']
})
export class DemandCardUnapprovedComponent implements OnInit {

  @Input() demand:Demand;
  member:Member;
  address:Address;
  ad:Ad;
  constructor(
    private adService:AdsService,
    private memberService:MembersService,
    private demandService:DemandsService,
    private toastr:ToastrService,
    private addressService:AddressesService
    ) { }

  ngOnInit(): void {
    this.loadMember();
    this.loadAd();
  }
  
  loadMember(){
    this.memberService.getMember(this.demand.userId).subscribe(response=>{
      this.member = response;
      // console.log(this.member);
      this.loadAddress();
    })
  }

  loadAddress(){
    this.addressService.getAddressByUserId(this.member.id).subscribe(response=>{
      this.address=response;
    })
  }

  loadAd(){
    this.adService.getAd(this.demand.adId).subscribe(response=>{
      this.ad = response;
    })

  }

  approve(){
   
    this.demand.isApproved =true;
    this.demandService.put(this.demand.id,this.demand).subscribe();
    this.toastr.info("Cererea a fost aprobata!")
    window.location.reload();
  }


  reject(){
    this.demand.isApproved =true;
    this.demand.isDeclined = true;
    this.demandService.put(this.demand.id,this.demand).subscribe();
    this.ad.quantity = this.ad.quantity + this.demand.quantityRequested;
    if(this.ad.isActive==false){
      this.ad.isActive=true;
    }
    this.adService.put(this.ad.id, this.ad).subscribe();
    this.toastr.info("Cererea a fost respinsa!")
    window.location.reload();
  }


}
