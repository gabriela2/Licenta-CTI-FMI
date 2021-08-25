import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Fundraiser } from 'src/app/models/fundraiser';
import Member from 'src/app/models/member';
import { Pagination } from 'src/app/models/pagination';
import { FundraisersService } from 'src/app/services/fundraisers.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-my-fundraisers',
  templateUrl: './my-fundraisers.component.html',
  styleUrls: ['./my-fundraisers.component.css']
})
export class MyFundraisersComponent implements OnInit {

  currentUserId:number;
  currentUser:Member;
  activeFundraisers:Fundraiser[]=[];
  rejectedFundraisers:Fundraiser[]=[];
  notApprovedYetFundraisers:Fundraiser[]=[];
  paginationActive: Pagination;
  paginationRejected: Pagination;
  paginationNotApprovedYet: Pagination;
  pageNumberActive = 1;
  pageNumberRejected = 1;
  pageNumberNotApprovedYet = 1;
  pageSize = 10;
  orderBy = 'createdAt';


  constructor(private router:Router, private fundraisersService: FundraisersService,private memberService:MembersService) { 
    this.currentUserId = parseInt(localStorage.getItem('userId'));
    this.memberService.getMember(this.currentUserId).subscribe(response=>{
      this.currentUser=response;
    })
    console.log(this.currentUserId);
  }

  ngOnInit(): void {
    this.loadActiveFundraisers();
    this.loadNotApprovedYetFundraisers();
    this.loadRejectedFundraisers();
  }

  loadActiveFundraisers(){
    this.fundraisersService.getApprovedFundraiserByUserId(this.currentUserId,this.pageNumberActive, this.pageSize,this.orderBy).subscribe(response=>{
      this.activeFundraisers = response.result;
      this.paginationActive = response.pagination;
    })
  }
  loadNotApprovedYetFundraisers(){
    this.fundraisersService.getNotApprovedYetFundraiserByUserId(this.currentUserId,this.pageNumberNotApprovedYet, this.pageSize,this.orderBy).subscribe(response=>{
      this.notApprovedYetFundraisers = response.result;
      this.paginationNotApprovedYet = response.pagination;
    })

  }

  loadRejectedFundraisers(){
    this.fundraisersService.getRejectedFundraiserByUserId(this.currentUserId, this.pageNumberRejected,this.pageSize,this.orderBy).subscribe(response=>{
      this.rejectedFundraisers=response.result;
      this.paginationRejected = response.pagination;
    })
  }

  

  changePageActive(event:any){
    this.pageNumberActive = event.page;
    this.loadActiveFundraisers();
  }
  changePageNotApprovedYet(event:any){
    this.pageNumberNotApprovedYet = event.page;
    this.loadNotApprovedYetFundraisers();
  }
  changePageRejected(event:any){
    this.pageNumberRejected = event.page;
    this.loadRejectedFundraisers();
  }

  applyActive(){
    this.loadActiveFundraisers();
  }
  applyRejected(){
    this.loadRejectedFundraisers();
  }
  applyNotApprovedYet(){
    this.loadNotApprovedYetFundraisers();
  }


  resetActive(){
    this.orderBy="createdAt";
    this.loadActiveFundraisers();
  }
  resetRejected(){
    this.orderBy="createdAt";
    this.loadRejectedFundraisers();
  }
  resetNotApprovedYet(){
    this.orderBy="createdAt";
    this.loadNotApprovedYetFundraisers();
  }


}
