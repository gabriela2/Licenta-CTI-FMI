import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators, } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/models/address';
import Member from 'src/app/models/member';
import { AddressesService } from 'src/app/services/addresses.service';
import { FundraisersService } from 'src/app/services/fundraisers.service';
import { MembersService } from 'src/app/services/members.service';
import { StripeService } from 'src/app/services/stripe.service';



@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  member: Member;
  address: Address
  currentUserId: number;
  addAddressForm: FormGroup;

  lastNamePattern = "^[a-zA-Z ,.'-]+$";
  firstNamePattern = "^[a-zA-Z ,.'-]+$";
  phoneNumberPattern = "^(07[0-9]{8}|02[0-9]{8}|03[0-9]{8})$";
  ibanPattern = "^(RO[0-9]{2}[A-Z]{4}[0-9]{16})+$";

  @ViewChild('editMemberForm') editMemberForm: NgForm;
  @ViewChild('editAddressForm') editAddressForm: NgForm;
  @ViewChild('editBankDetailsForm') editBankDetailsForm: NgForm;



  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editMemberForm.dirty || this.editAddressForm.dirty || this.editBankDetailsForm.dirty) {
      $event.returnValue = true;
    }
  }


  constructor(
    private memberService: MembersService,
    private addressService: AddressesService,
    private fundraiserService: FundraisersService,
    private toastr: ToastrService,
    private stripeService: StripeService,
    private formBuilder: FormBuilder) {
    this.currentUserId = parseInt(localStorage.getItem('userId'));
  }

  ngOnInit(): void {
    this.loadMember();
    this.addAddressForm = this.formBuilder.group({
      houserNumber: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      country: ['', Validators.required],
      zipCode: ['', Validators.required],
    });
  }

  addAddress() {
    let address = {
      id: 0,
      houseNumber: this.addAddressForm.get('houseNumber').value,
      street: this.addAddressForm.get('street').value,
      city: this.addAddressForm.get('city').value,
      district: this.addAddressForm.get('district').value,
      country: this.addAddressForm.get('country').value,
      zipCode: this.addAddressForm.get('zipCode').value,
      userId: this.currentUserId
    };
    this.addressService.addAddress(address).subscribe();

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
    if (this.member.isOrganisation == false) {
      this.member.organizationIdentificationNumber = null;
    }
    console.log(this.member);
    this.memberService.updateMemberProfile(this.member.id, this.member).subscribe();
    this.toastr.info('Datele utilizatorului au fost actualizate cu success!');
    this.editMemberForm.reset(this.member);
  }

  StripeAccount() {
    this.stripeService.postExpressAccount(this.currentUserId).subscribe(a => { console.log(a); });
    this.memberService.updateMemberStripeDetails(this.member.id, this.member).subscribe();
    this.sentFundraisersForApproval(this.member.id);

  }

  goToWebsite(link: string) {
    this.member.stripeLinkWasAccessed = true;
    this.memberService.updateMemberStripeAccess(this.member.id, this.member).subscribe(a => {
      console.log("s-a accesat")
    });
    window.open(link, "_blank");

  }

  updateAddress() {
    this.addressService.updateAddress(this.address.id, this.address).subscribe();
    this.toastr.info('Adresa utilizatorului a fost actualizata cu success!');
    this.editAddressForm.reset(this.address);
  }

  updateBankDetails() {
    this.memberService.updateMemberBankDetails(this.member.id, this.member).subscribe();
    this.toastr.info('Datele utilizatorului au fost actualizate cu success!');
    this.editBankDetailsForm.reset(this.member);
    this.sentFundraisersForApproval(this.member.id);

  }


  deleteStripeAccount() {
    this.member.stripeConfigurationLink = null;
    this.member.stripeAccount = null;
    this.memberService.updateMemberStripeDetails(this.member.id, this.member).subscribe(a => {
      console.log("detalii")
      this.member.stripeLinkWasAccessed = false;
      this.memberService.updateMemberStripeAccess(this.member.id, this.member).subscribe(a => { console.log("access") });
    });
  }

  sentFundraisersForApproval(id: number) {
    this.fundraiserService.getFundraisersByUserId(id).subscribe(response => {
      for (const item of response) {
        item.isRejected = false;
        item.isValidated = false;
        this.fundraiserService.put(item.id, item).subscribe();
      }
    })
  }



}
