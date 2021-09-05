import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ad } from 'src/app/models/ad';
import { Address } from 'src/app/models/address';
import Member from 'src/app/models/member';
import { AddressesService } from 'src/app/services/addresses.service';
import { AdsService } from 'src/app/services/ads.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-ads-card-unapproved',
  templateUrl: './ads-card-unapproved.component.html',
  styleUrls: ['./ads-card-unapproved.component.css']
})
export class AdsCardUnapprovedComponent implements OnInit {

  @Input() ad:Ad;
  member:Member;
  address:Address;
  constructor(
    private memberService:MembersService,
    private toastr:ToastrService,
    private adService: AdsService,
    private addressService:AddressesService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    this.memberService.getMember(this.ad.userId).subscribe(response=>{
      this.member = response;
      console.log(this.member);
      this.loadAddress();
    })
  }

  loadAddress(){
    this.addressService.getAddressByUserId(this.member.id).subscribe(response=>{
      this.address=response;
    })
  }
  reject(){
    this.ad.isValidated=true;
    this.ad.isRejected=true;
    this.adService.put(this.ad.id, this.ad).subscribe();
    this.toastr.info("Strangerea de fonduri a fost respinsa!")
    window.location.reload();
  }

  approve(){
    this.ad.isValidated=true;
    this.ad.isRejected=false;
    this.adService.put(this.ad.id, this.ad).subscribe();
    this.toastr.info("Strangerea de fonduri a fost acceptata!")
    window.location.reload();

  }

  view(){
    this.router.navigateByUrl('/ads-list/'+this.ad.id)
  }

}
