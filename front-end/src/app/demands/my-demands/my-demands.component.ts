import { Component, OnInit } from '@angular/core';
import { Ad } from 'src/app/models/ad';
import { Demand } from 'src/app/models/demand';
import { Pagination } from 'src/app/models/pagination';
import { AdsService } from 'src/app/services/ads.service';
import { DemandsService } from 'src/app/services/demands.service';

@Component({
  selector: 'app-my-demands',
  templateUrl: './my-demands.component.html',
  styleUrls: ['./my-demands.component.css']
})
export class MyDemandsComponent implements OnInit {

  approvedDemands:Demand[];
  notApprovedYetDemands:Demand[];
  rejectedDemands:Demand [];
  currentUserId:number;
  ad:Ad;

  paginationApproved: Pagination;
  pageNumberApproved = 1;
  paginationNotApprovedYet: Pagination;
  pageNumberNotApprovedYet = 1;
  paginationRejected: Pagination;
  pageNumberRejected = 1;
  pageSize = 10;
  orderBy = 'createdAt';

  constructor(private demandsService:DemandsService,) {
    this.currentUserId = parseInt(localStorage.getItem('userId'));
   }

  ngOnInit(): void {
    this.getApprovedDemands();
    this.getNotApprovedYetDemands();
    this.getRejectedDemands();
  }

  getApprovedDemands(){
    this.demandsService.getApprovedDemandsByUserId(this.currentUserId,this.pageNumberApproved,this.pageSize,this.orderBy).subscribe(response=>{
      this.approvedDemands=response.result;
      this.paginationApproved = response.pagination;
    })

  }

  getNotApprovedYetDemands(){
    this.demandsService.getNotApprovedYetDemandsByUserId(this.currentUserId,this.pageNumberNotApprovedYet,this.pageSize,this.orderBy).subscribe(response=>{
      this.notApprovedYetDemands = response.result;
      this.paginationNotApprovedYet= response.pagination;
    })
  }

  getRejectedDemands(){
    this.demandsService.getRejectedDemandsByUserId(this.currentUserId,this.pageNumberRejected,this.pageSize,this.orderBy).subscribe(response=>{
      this.rejectedDemands = response.result;
      this.paginationRejected = response.pagination;
    })

  }

  changePageApproved(event:any){
    this.pageNumberApproved = event.page;
    this.getApprovedDemands();
  }
  changePageNotApprovedYet(event:any){
    this.pageNumberNotApprovedYet = event.page;
    this.getNotApprovedYetDemands();
  }
  changePageRejected(event:any){
    this.pageNumberRejected = event.page;
    this.getRejectedDemands();
  }

  applyPageApproved(){
    this.getApprovedDemands();
  }
  applyPageNotApprovedYet(){
    this.getNotApprovedYetDemands();
  }
  applyPageRejected(){
    this.getRejectedDemands();
  }


  resetPageApproved(){
    this.orderBy="createdAt";
    this.getApprovedDemands();
  }

  resetPageNotApprovedYet(){
    this.orderBy="createdAt";
    this.getNotApprovedYetDemands();
  }

  resetPageRejected(){
    this.orderBy="createdAt";
    this.getRejectedDemands();
  }



}
