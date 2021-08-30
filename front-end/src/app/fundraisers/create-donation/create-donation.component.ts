import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { donatorDetails } from 'src/app/models/donatorDetails';
import { Fundraiser } from 'src/app/models/fundraiser';
import Member from 'src/app/models/member';
import { Payment } from 'src/app/models/payment';
import { Transfer } from 'src/app/models/transfer';
import { DonationsService } from 'src/app/services/donations.service';
import { FundraisersService } from 'src/app/services/fundraisers.service';
import { MembersService } from 'src/app/services/members.service';
import { StripeService } from 'src/app/services/stripe.service';

declare var Stripe: any;

@Component({
  selector: 'app-create-donation',
  templateUrl: './create-donation.component.html',
  styleUrls: ['./create-donation.component.css']
})

export class CreateDonationComponent implements OnInit {
  fundraiser: Fundraiser;
  owner: Member;
  card: any;
  donator = new donatorDetails()
  payment = new Payment();
  transfer = new Transfer();
  

  readonly stripe = Stripe('pk_test_51JIGm5AB9XFaK2pFpy8GJgeCtgvw2Ih3UA9Cfl20mhsVGJhYVbZahbsr4w1CVI6cWJtycawlgkM2lrXpVlcK2XRg00mGCyTBqw');


  constructor(
    private memberService: MembersService,
    private stripeService: StripeService,
    private fundraiserService:FundraisersService,
    private donationService:DonationsService,
    public bsModalRef: BsModalRef,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadMember();
    var elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount('#card-element');
    this.card.addEventListener('change', event => {
      if (event.error) {
        this.toastr.warning("Te rugam sa introduci corect elementele de identificare de pe card");
      }
    })
  }

  loadMember() {
    this.memberService.getMember(this.fundraiser.userId).subscribe(response => {
      this.owner = response;
    })
  }

  pay() {

    this.stripe.createToken(this.card).then(result => {
      if (result.error) {
        this.toastr.error("Plata a fost respinsa. Te rugam sa furnizezi corect informatile");
      } else {
        this.payment.token = result.token.id;
        this.payment.description = this.donator.description;
        this.stripeService.postCharge(this.payment).subscribe(() => {
          this.toastr.info("Plata a fost realizata cu success");
        })
        console.log(this.payment.amount);
        var fees= (this.payment.amount * 0.029)+1;
        console.log(fees)
        this.transfer.amount = this.payment.amount- fees ;
        console.log(this.transfer.amount);
        this.transfer.stripeAccount = this.owner.stripeAccount;
        this.transfer.description = this.donator.description;
        this.stripeService.postTransfer(this.transfer).subscribe(response => console.log(response));
        var donation ={
          id:0,
          createdAt:new Date(),
          amount:this.transfer.amount,
          userId:parseInt(localStorage.getItem('userId')),
          fundraiserId:this.fundraiser.id,
          description:this.payment.description
        }
        this.donationService.post(donation).subscribe();
        this.fundraiser.currentAmount = this.fundraiser.currentAmount + this.transfer.amount;
        this.fundraiserService.put(this.fundraiser.id, this.fundraiser).subscribe();
        this.bsModalRef.hide();
        window.location.reload();

      }
    })


  }

}
