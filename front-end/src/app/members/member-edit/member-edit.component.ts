import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router:Router,
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


  updateMember(form) {
    let member = {
      id: this.member.id,
      userName: this.member.userName,
      email: this.member.email,
      lastName: form.lastName,
      firstName: form.firstName,
      phoneNumber: form.phoneNumber,
      createdAt: this.member.createdAt,
      lastActivity: new Date(),
      isOrganisation: this.member.isOrganisation,
      emailConfirmed: this.member.emailConfirmed,
      stripeAccount: this.member.stripeAccount,
      stripeConfigurationLink: this.member.stripeConfigurationLink,
      organizationIdentificationNumber: this.member.isOrganisation == true ? form.OrganizationIdentificationNumber:null,
      photoUrl: this.member.photoUrl
    }
    console.log(member);
    this.memberService.updateMember(member.id, member).subscribe();
    this.toastr.success('Datele utilizatorului au fost actualizate cu success!');
    this.editMemberForm.reset(this.member);
  }

  StripeAccount(){
    this.paymentService.createConnectedExpressAccount(this.currentUserId).subscribe(a=> {console.log(a);});

  }

  goToWebsite(link:string){
    window.open(link,"_blank");
    let member = {
      id: this.member.id,
      userName: this.member.userName,
      email: this.member.email,
      lastName: this.member.lastName,
      firstName: this.member.firstName,
      phoneNumber: this.member.phoneNumber,
      createdAt: this.member.createdAt,
      lastActivity: new Date(),
      isOrganisation: this.member.isOrganisation,
      emailConfirmed: this.member.emailConfirmed,
      stripeAccount: this.member.stripeAccount,
      stripeConfigurationLink: this.member.stripeConfigurationLink,
      organizationIdentificationNumber: this.member.organizationIdentificationNumber ,
      photoUrl: this.member.photoUrl,
      stripeLinkWasAccessed:true
    }
    console.log(member);
    this.memberService.updateMember(member.id, member).subscribe();

  }

  updateAddress(form) {
    let address = {
      id: this.address.id,
      houseNumber:form.houseNumber,
      street: form.street,
      city: form.city,
      district: form.district,
      country: form.country,
      zipCode: form.zipCode,
      userId: this.currentUserId
    }
    this.addressService.updateAddress(address.id, address).subscribe();
    this.toastr.success('Adresa utilizatorului a fost actualizata cu success!');
    this.editAddressForm.reset(this.address);
  }

  updateBankDetails(form){
    let member = {
      id: this.member.id,
      userName: this.member.userName,
      email: this.member.email,
      lastName: this.member.lastName,
      firstName: this.member.firstName,
      phoneNumber: this.member.phoneNumber,
      createdAt: this.member.createdAt,
      lastActivity: new Date(),
      isOrganisation: this.member.isOrganisation,
      emailConfirmed: this.member.emailConfirmed,
      stripeAccount: this.member.stripeAccount,
      stripeConfigurationLink: this.member.stripeConfigurationLink,
      organizationIdentificationNumber: this.member.organizationIdentificationNumber ,
      photoUrl: this.member.photoUrl,
      stripeLinkWasAccessed:this.member.stripeLinkWasAccessed,
      iban:form.iban,
      owner:form.owner,
      bank:form.bank,
    }
    this.memberService.updateMember(member.id, member).subscribe();
    this.toastr.success('Datele utilizatorului au fost actualizate cu success!');
    this.editBankDetailsForm.reset(this.member);
    
  }
  
  updateStripeDetails(form){
    let member = {
      id: this.member.id,
      userName: this.member.userName,
      email: this.member.email,
      lastName: this.member.lastName,
      firstName: this.member.firstName,
      phoneNumber: this.member.phoneNumber,
      createdAt: this.member.createdAt,
      lastActivity: new Date(),
      isOrganisation: this.member.isOrganisation,
      emailConfirmed: this.member.emailConfirmed,
      stripeAccount: form.stripe,
      stripeConfigurationLink: null,
      organizationIdentificationNumber: this.member.organizationIdentificationNumber ,
      photoUrl: this.member.photoUrl,
      stripeLinkWasAccessed:true,
      iban: this.member.iban,
      owner: this.member.owner,
      bank: this.member.bank,
    }
    this.memberService.updateMember(member.id, member).subscribe();
    this.toastr.success('Datele utilizatorului au fost actualizate cu success!');
    this.editStripeDetailsForm.reset(member);

  }



}
