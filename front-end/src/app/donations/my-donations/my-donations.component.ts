import { Component, OnInit } from '@angular/core';
import { Donation } from 'src/app/models/donation';
import { Pagination } from 'src/app/models/pagination';
import { DonationsService } from 'src/app/services/donations.service';

@Component({
  selector: 'app-my-donations',
  templateUrl: './my-donations.component.html',
  styleUrls: ['./my-donations.component.css']
})
export class MyDonationsComponent implements OnInit {

  donations:Donation[];
  currentUserId:number;
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 10;
  orderBy = 'createdAt';
  constructor(private donationService:DonationsService) { }

  ngOnInit(): void {
    this.currentUserId = parseInt(localStorage.getItem('userId'));
    this.loadDonations();
  }
  loadDonations(){
    this.donationService.getDonationsByUserId(this.currentUserId,this.pageNumber,this.pageSize, this.orderBy).subscribe(response=>{
      this.donations=response.result;
      this.pagination = response.pagination;
    })
  }


  changePage(event:any){
    this.pageNumber = event.page;
    this.loadDonations();
  }
  applyPage(){
    this.loadDonations();
  }

  resetPage(){
    this.orderBy="createdAt";
    this.loadDonations();
  }

}
