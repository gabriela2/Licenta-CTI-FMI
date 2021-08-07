import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { donatorDetails } from 'src/app/models/donatorDetails';
import { Fundraiser } from 'src/app/models/fundraiser';
import Member from 'src/app/models/member';
import { Payment } from 'src/app/models/payment';
import { Transfer } from 'src/app/models/transfer';
import { FundraisersService } from 'src/app/services/fundraisers.service';
import { MembersService } from 'src/app/services/members.service';
import { PaymentService } from 'src/app/services/payment.service';

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
    private paymentService: PaymentService,
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
        this.toastr.error("Te rugam sa introduci corect elementele de identificare de pe card");
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
        this.toastr.error("Plata a fost respinsa. Te rugam furnizeaza corect informatile");
        // document.getElementById('card-error').textContent = result.error.message;
      } else {
        this.payment.token = result.token.id;
        this.payment.description = this.donator.description;
        this.paymentService.createPayment(this.payment).subscribe(() => {
          this.toastr.success("Plata a fost realizata cu success");
          this.transfer.amount = this.payment.amount;
          this.transfer.stripeAccount = this.owner.stripeAccount;
          this.paymentService.transferPayment(this.transfer).subscribe(response => console.log(response));

        })
      }
    })


  }

}
