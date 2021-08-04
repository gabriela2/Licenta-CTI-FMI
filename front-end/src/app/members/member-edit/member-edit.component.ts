import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm, } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/models/address';
import Member from 'src/app/models/member';
import { AddressesService } from 'src/app/services/addresses.service';
import { MembersService } from 'src/app/services/members.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
member: Member;
  address: Address
  currentUserId: number;

  lastNamePattern = "^[a-zA-Z ,.'-]+$";
  firstNamePattern = "^[a-zA-Z ,.'-]+$";
  phoneNumberPattern = "^(07[0-9]{8}|02[0-9]{8}|03[0-9]{8})$";
  ibanPattern="^(RO[0-9]{2}[A-Z]{4}[0-9]{16})+$";

  @ViewChild('editMemberForm') editMemberForm: NgForm;
  @ViewChild('editAddressForm') editAddressForm: NgForm;
  @ViewChild('editBankDetailsForm')editBankDetailsForm:NgForm;
  @ViewChild('editStripeDetailsForm')editStripeDetailsForm:NgForm;


  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editMemberForm.dirty || this.editAddressForm.dirty || this.editBankDetailsForm.dirty || this.editStripeDetailsForm.dirty) {
      $event.returnValue = true;
    }
  }


  constructor(
    private memberService: MembersService,
    private addressService: AddressesService,
    private toastr: ToastrService,
    private paymentService:PaymentService) {
    this.currentUserId = parseInt(localStorage.getItem('userId'));
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.memberService.getMember(this.currentUserId).subscribe(member => {
      this.member = member;
      this.loadAddress();
    })
  }


  loadAddress() {
    this.addressService.getAddressByUserId(this.member.id).subscribe(address => {
      this.address = address;
    })
  }


  updateMember() {
    if (this.member.isOrganisation==false){
      this.member.organizationIdentificationNumber = null;
    }
    console.log(this.member);
    this.memberService.updateMemberProfile(this.member.id, this.member).subscribe();
    this.toastr.success('Datele utilizatorului au fost actualizate cu success!');
    this.editMemberForm.reset(this.member);
  }

  StripeAccount(){
    this.paymentService.createConnectedExpressAccount(this.currentUserId).subscribe(a=> {console.log(a);});
    this.memberService.updateMemberStripeDetails(this.member.id, this.member).subscribe();
    this.editStripeDetailsForm.reset(this.member);
  }

  goToWebsite(link:string){
    window.open(link,"_blank");
    this.member.stripeLinkWasAccessed=true;
    this.memberService.updateMemberStripeAccess(this.member.id, this.member).subscribe();
  }

  updateAddress() {
    this.addressService.updateAddress(this.address.id, this.address).subscribe();
    this.toastr.success('Adresa utilizatorului a fost actualizata cu success!');
    this.editAddressForm.reset(this.address);
  }

  updateBankDetails(){
    this.memberService.updateMemberBankDetails(this.member.id, this.member).subscribe();
    this.toastr.success('Datele utilizatorului au fost actualizate cu success!');
    this.editBankDetailsForm.reset(this.member);
    
  }
  
  updateStripeDetails(){
    console.log(this.member);
    this.member.stripeConfigurationLink=null;
    this.memberService.updateMemberStripeDetails(this.member.id, this.member).subscribe();
    this.toastr.success('Datele utilizatorului au fost actualizate cu success!');
    this.editStripeDetailsForm.reset(this.member);
    this.member.stripeLinkWasAccessed=true;
    this.memberService.updateMemberStripeAccess(this.member.id, this.member).subscribe();

  }



}
