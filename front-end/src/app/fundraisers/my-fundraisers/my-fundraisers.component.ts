import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Fundraiser } from 'src/app/models/fundraiser';
import { FundraisersService } from 'src/app/services/fundraisers.service';

@Component({
  selector: 'app-my-fundraisers',
  templateUrl: './my-fundraisers.component.html',
  styleUrls: ['./my-fundraisers.component.css']
})
export class MyFundraisersComponent implements OnInit {

  currentUserLogger:number;
  activeFundraisers:Fundraiser[]=[];
  rejectedFundraisers:Fundraiser[]=[];
  notApprovedYetFundraisers:Fundraiser[]=[];


  constructor(private router:Router, private fundraisersService: FundraisersService) { 
    this.currentUserLogger = parseInt(localStorage.getItem('userId'));
    console.log(this.currentUserLogger);
  }

  ngOnInit(): void {
    this.loadActiveFundraisers();
    this.loadNotApprovedYetFundraisers();
    this.loadRejectedFundraisers();
  }

  loadActiveFundraisers(){
    this.fundraisersService.getFundraisersByUserId(this.currentUserLogger).pipe(
      map( response =>response.filter((fundraiser:Fundraiser)=>fundraiser.isValidated ===true && fundraiser.isRejected===false && fundraiser.userId===this.currentUserLogger))
    ).subscribe(fundraisers=>{
        this.activeFundraisers= fundraisers;
        console.log(this.activeFundraisers)
      })
  }

  loadRejectedFundraisers(){
    this.fundraisersService.getFundraisersByUserId(this.currentUserLogger).pipe(
      map( response =>response.filter((fundraiser:Fundraiser)=>fundraiser.isValidated ===true && fundraiser.isRejected===true && fundraiser.userId===this.currentUserLogger))
    ).subscribe(fundraisers=>{
        this.rejectedFundraisers= fundraisers;
        console.log(this.rejectedFundraisers)
      })
  }

  loadNotApprovedYetFundraisers(){
    this.fundraisersService.getFundraisersByUserId(this.currentUserLogger).pipe(
      map( response =>response.filter((fundraiser:Fundraiser)=>fundraiser.isValidated ===false && fundraiser.isRejected===false && fundraiser.userId===this.currentUserLogger))
    ).subscribe(fundraisers=>{
        this.notApprovedYetFundraisers= fundraisers;
      })
  }


}
