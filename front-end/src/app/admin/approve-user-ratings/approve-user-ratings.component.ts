import { Component, OnInit } from '@angular/core';
import { Ad } from 'src/app/models/ad';
import { Pagination } from 'src/app/models/pagination';
import { UserRating } from 'src/app/models/userRating';
import { AdminService } from 'src/app/services/admin.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-approve-user-ratings',
  templateUrl: './approve-user-ratings.component.html',
  styleUrls: ['./approve-user-ratings.component.css']
})
export class ApproveUserRatingsComponent implements OnInit {

  userRatings:UserRating[];
  pagination:Pagination;
  pageNumber=1;
  pageSize=10;
  orderBy='createdAt';
  

  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.getUserRatings();
  }

  
  apply(){
    this.getUserRatings();

  }
  reset(){
    this.orderBy="createdAt";
    this.getUserRatings();
  }

  getUserRatings(){
    this.adminService.getInactiveUserRatings(this.pageNumber,this.pageSize, this.orderBy).subscribe(response=>{
      this.userRatings=response.result;
      this.pagination = response.pagination;
    })
  }

  changePage(event:any){
    this.pageNumber = event.page;
    this.getUserRatings();
  }

}
