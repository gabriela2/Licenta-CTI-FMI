import { Component, Input, OnInit } from '@angular/core';
import { Address } from 'src/app/models/address';
import { Demand } from 'src/app/models/demand';
import Member from 'src/app/models/member';
import { AddressesService } from 'src/app/services/addresses.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-demand-card-approved',
  templateUrl: './demand-card-approved.component.html',
  styleUrls: ['./demand-card-approved.component.css']
})
export class DemandCardApprovedComponent implements OnInit {

  @Input() demand:Demand;
  member:Member;
  address:Address;
  constructor(
    private memberService:MembersService,
    private addressService:AddressesService
    ) { }
  

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    this.memberService.getMember(this.demand.userId).subscribe(response=>{
      this.member = response;
      this.loadAddress();
    })
  }

  loadAddress(){
    this.addressService.getAddressByUserId(this.member.id).subscribe(response=>{
      this.address=response;
    })
  }


}

