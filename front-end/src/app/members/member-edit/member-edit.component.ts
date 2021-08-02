import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/models/address';
import Member from 'src/app/models/member';
import { AddressesService } from 'src/app/services/addresses.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {


  editMemberForm :FormGroup;
  editAddressForm :FormGroup;

  member:Member;
  address:Address
  currentUserId:number;

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editMemberForm.dirty || this.editAddressForm.dirty) {
      $event.returnValue = true;
    }
  }


  constructor(
    private memberService:MembersService,
    private addressService:AddressesService,
    private toastr:ToastrService,
    private formBuider:FormBuilder) { }

  ngOnInit(): void {
    this.currentUserId = parseInt(localStorage.getItem('userId'));
    this.loadMember;
    this.initializeForm();
  }

  initializeForm(){
    this.editMemberForm=this.formBuider.group({
      lastName:[this.member.lastName,Validators.required],
      firstName:[this.member.firstName, Validators.required,],
      phoneNumber:[this.member.phoneNumber, [Validators.required,
        Validators.pattern('^(?:(?:(?:00\s?|\+)40\s?|0)(?:7\d{2}\s?\d{3}\s?\d{3}|(21|31)\d{1}\s?\d{3}\s?\d{3}|((2|3)[3-7]\d{1})\s?\d{3}\s?\d{3}|(8|9)0\d{1}\s?\d{3}\s?\d{3}))$')]],
      isOrganisation:[this.member.isOrganisation,Validators.required],
      organizationIdentificationNumber:[this.member.organizationIdentificationNumber]
    })

    this.editAddressForm=this.formBuider.group({
      houseNumber:[this.address.houseNumber,[Validators.required]],
      street:[this.address.street,[Validators.required]],
      city:[this.address.city,[Validators.required]],
      district:[this.address.district,[Validators.required]],
      country:[this.address.country,[Validators.required]],
      zipCode:[this.address.zipCode,[Validators.required]],

    })
  }

  loadMember(){
    this.memberService.getMember(this.currentUserId).subscribe(member=>{
      this.member=member;
      this.loadAddress();
    })
  }
  loadAddress(){
    this.addressService.getAddressByUserId(this.member.id).subscribe(address=>{
      this.address = address;
    })
  }


  updateMember(){
    this.memberService.updateMember(this.member.id, this.member).subscribe();
    this.toastr.success('Datele utilizatorului au fost actualizate cu success!');
    this.editMemberForm.reset(this.member);
  }

  updateAddress(){
    this.addressService.updateAddress(this.address.id,this.address).subscribe();
    this.toastr.success('Adresa utilizatorului a fost actualizata cu success!');
    this.editAddressForm.reset(this.member);
  }
  

}
