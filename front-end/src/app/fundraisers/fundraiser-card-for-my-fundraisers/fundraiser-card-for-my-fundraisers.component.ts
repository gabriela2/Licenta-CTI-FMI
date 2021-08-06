import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fundraiser } from 'src/app/models/fundraiser';

@Component({
  selector: 'app-fundraiser-card-for-my-fundraisers',
  templateUrl: './fundraiser-card-for-my-fundraisers.component.html',
  styleUrls: ['./fundraiser-card-for-my-fundraisers.component.css']
})
export class FundraiserCardForMyFundraisersComponent implements OnInit {

  @Input() fundraiser:Fundraiser;
  constructor() { 
    
  } 

  ngOnInit(): void {
  
  }

  

  


}
