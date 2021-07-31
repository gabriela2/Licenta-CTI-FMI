import { Component, Input, OnInit } from '@angular/core';
import { Fundraiser } from 'src/app/models/fundraiser';

@Component({
  selector: 'app-fundraiser-card',
  templateUrl: './fundraiser-card.component.html',
  styleUrls: ['./fundraiser-card.component.css']
})
export class FundraiserCardComponent implements OnInit {

  @Input() fundraiser:Fundraiser;
  constructor() { }

  ngOnInit(): void {
  }

  addToFavorite(){
    console.log("Userul curent a adaugat la favorite anuntul "+this.fundraiser.id);
  }

}
