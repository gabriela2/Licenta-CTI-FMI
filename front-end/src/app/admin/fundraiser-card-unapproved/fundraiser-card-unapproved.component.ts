import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/models/address';
import { Fundraiser } from 'src/app/models/fundraiser';
import Member from 'src/app/models/member';
import { AddressesService } from 'src/app/services/addresses.service';
import { FundraisersService } from 'src/app/services/fundraisers.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-fundraiser-card-unapproved',
  templateUrl: './fundraiser-card-unapproved.component.html',
  styleUrls: ['./fundraiser-card-unapproved.component.css']
})
export class FundraiserCardUnapprovedComponent implements OnInit {
 
  @Input() fundraiser:Fundraiser;
  member:Member;
  address:Address;
  constructor(
    private memberService:MembersService,
    private toastr:ToastrService,
    private fundraiserService: FundraisersService,
    private addressService:AddressesService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    this.memberService.getMember(this.fundraiser.userId).subscribe(response=>{
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
    this.fundraiser.isValidated=true;
    this.fundraiser.isRejected=true;
    this.fundraiserService.put(this.fundraiser.id, this.fundraiser).subscribe();
    this.toastr.info("Strangerea de fonduri a fost respinsa!")
    window.location.reload();


  }
  approve(){
    this.fundraiser.isValidated=true;
    this.fundraiser.isRejected=false;
    this.fundraiserService.put(this.fundraiser.id, this.fundraiser).subscribe();
    this.toastr.info("Strangerea de fonduri a fost acceotata!")
    window.location.reload();

  }

  view(){
    this.router.navigateByUrl('/fundraisers-list/'+this.fundraiser.id)
  }

}
