import { Component, Input, OnInit } from '@angular/core';
import { Donation } from 'src/app/models/donation';
import { Fundraiser } from 'src/app/models/fundraiser';
import { FundraisersService } from 'src/app/services/fundraisers.service';

@Component({
  selector: 'app-donation-card',
  templateUrl: './donation-card.component.html',
  styleUrls: ['./donation-card.component.css']
})
export class DonationCardComponent implements OnInit {

  @Input() donation:Donation;
  fundraiser:Fundraiser;
  amount:number
  constructor(private fundraiserService:FundraisersService) { }

  ngOnInit(): void {
    this.getFundraiser();
    this.amount = Math.ceil(this.donation.amount +1 + this.donation.amount*0.029);
  }
  getFundraiser(){
    this.fundraiserService.getFundraiser(this.donation.fundraiserId).subscribe(response=>{
      this.fundraiser=response;
    })
  }

}
