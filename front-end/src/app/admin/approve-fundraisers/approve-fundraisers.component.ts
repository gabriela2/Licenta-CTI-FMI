import { Component, OnInit } from '@angular/core';
import { Fundraiser } from 'src/app/models/fundraiser';
import { Pagination } from 'src/app/models/pagination';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-approve-fundraisers',
  templateUrl: './approve-fundraisers.component.html',
  styleUrls: ['./approve-fundraisers.component.css']
})
export class ApproveFundraisersComponent implements OnInit {

  fundraisers:Fundraiser[];
  pagination:Pagination;
  pageNumber=1;
  pageSize=10;
  orderBy='createdAt';
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.loadFundraisers();
  }

  apply(){
    this.loadFundraisers();

  }
  reset(){
    this.orderBy="createdAt";
    this.loadFundraisers();
  }
  changePage(event:any){
    this.pageNumber = event.page;
    this.loadFundraisers();
  }

  loadFundraisers(){
    this.adminService.getInactiveFundraisers(this.pageNumber,this.pageSize, this.orderBy).subscribe(response=>{
      this.fundraisers=response.result;
      this.pagination = response.pagination;
      console.log(this.fundraisers);
    })
  }

}
