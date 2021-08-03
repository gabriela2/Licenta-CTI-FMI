import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
  member: Member;
  address: Address
  currentUserId: number;
  isOrganization: any;

  lastNamePattern = "^[a-zA-Z ,.'-]+$";
  firstNamePattern = "^[a-zA-Z ,.'-]+$";
  phoneNumberPattern = "^(07[0-9]{8}|02[0-9]{8}|03[0-9]{8})$"

  @ViewChild('editMemberForm') editMemberForm: NgForm;
  @ViewChild('editAddressForm') editAddressForm: NgForm;

  // @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
  //   if (this.editMemberForm.dirty || this.editAddressForm.dirty) {
  //     $event.returnValue = true;
  //   }
  // }


  constructor(
    private memberService: MembersService,
    private addressService: AddressesService,
    private toastr: ToastrService) {
    this.currentUserId = parseInt(localStorage.getItem('userId'));
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.memberService.getMember(this.currentUserId).subscribe(member => {
      this.member = member;
      this.isOrganization = member.isOrganisation;
      this.loadAddress();
    })
  }


  loadAddress() {
    this.addressService.getAddressByUserId(this.member.id).subscribe(address => {
      this.address = address;
    })
  }


  updateMember(form) {
    var firstName = form.firstName;
    console.log(firstName);

    var lastName = form.lastName;
    console.log(lastName);

    var phoneNumber = form.phoneNumber;
    console.log(phoneNumber);
    var OrganizationIdentificationNumber = form.OrganizationIdentificationNumber;
    console.log(OrganizationIdentificationNumber);

    let member = {
      id: this.member.id,
      userName: this.member.userName,
      email: this.member.email,
      lastName: lastName,
      firstName: firstName,
      phoneNumber: phoneNumber,
      createdAt: this.member.createdAt,
      lastActivity: new Date(),
      isOrganisation: OrganizationIdentificationNumber == "" ? false : true,
      emailConfirmed: this.member.emailConfirmed,
      stripeAccount: this.member.stripeAccount,
      stripeConfigurationLink: this.member.stripeConfigurationLink,
      organizationIdentificationNumber: OrganizationIdentificationNumber == "" ? null : OrganizationIdentificationNumber,
      photoUrl: this.member.photoUrl
    }
    console.log(member);
    this.memberService.updateMember(member.id, member).subscribe();
    this.toastr.success('Datele utilizatorului au fost actualizate cu success!');
    this.editMemberForm.reset(this.member);
  }

  updateAddress(form) {
    var houseNumber = form.houseNumber;
    var street = form.street;
    var city = form.city;
    var district = form.district;
    var country = form.country;
    var zipCode = form.zipCode;


    let address = {
      id: this.address.id,
      houseNumber: houseNumber,
      street: street,
      city: city,
      district: district,
      country: country,
      zipCode: zipCode,
      userId: this.currentUserId
    }
    this.addressService.updateAddress(address.id, address).subscribe();
    this.toastr.success('Adresa utilizatorului a fost actualizata cu success!');
    this.editAddressForm.reset(this.address);
  }


}
