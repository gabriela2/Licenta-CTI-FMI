import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/models/pagination';
import { UserRating } from 'src/app/models/userRating';
import { UserRatingsService } from 'src/app/services/user-ratings.service';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.css']
})
export class MyReviewsComponent implements OnInit {

  approvedReviews:UserRating[];
  notApprovedYetReviews:UserRating[];
  rejectedReviews:UserRating [];
  currentUserId:number;

  paginationApproved: Pagination;
  pageNumberApproved = 1;
  paginationNotApprovedYet: Pagination;
  pageNumberNotApprovedYet = 1;
  paginationRejected: Pagination;
  pageNumberRejected = 1;
  pageSize = 10;
  orderBy = 'createdAt';

  constructor(private userRatingService:UserRatingsService,) {
    this.currentUserId = parseInt(localStorage.getItem('userId'));
   }

  ngOnInit(): void {
    this.getApprovedUserRatings();
    this.getNotApprovedYetUserRatings();
    this.getRejectedUserRatings();
  }

  getApprovedUserRatings(){
    this.userRatingService.getApprovedUserRatingsBySenderId(this.currentUserId,this.pageNumberApproved,this.pageSize,this.orderBy).subscribe(response=>{
      this.approvedReviews=response.result;
      this.paginationApproved = response.pagination;
    })

  }

  getNotApprovedYetUserRatings(){
    this.userRatingService.getNotApprovedYetUserRatingsBySenderId(this.currentUserId,this.pageNumberNotApprovedYet,this.pageSize,this.orderBy).subscribe(response=>{
      this.notApprovedYetReviews = response.result;
      this.paginationNotApprovedYet= response.pagination;
    })
  }

  getRejectedUserRatings(){
    this.userRatingService.getRejectedUserRatingsBySenderId(this.currentUserId,this.pageNumberRejected,this.pageSize,this.orderBy).subscribe(response=>{
      this.rejectedReviews = response.result;
      this.paginationRejected = response.pagination;
    })

  }

  changePageApproved(event:any){
    this.pageNumberApproved = event.page;
    this.getApprovedUserRatings();
  }
  changePageNotApprovedYet(event:any){
    this.pageNumberNotApprovedYet = event.page;
    this.getNotApprovedYetUserRatings();
  }
  changePageRejected(event:any){
    this.pageNumberRejected = event.page;
    this.getRejectedUserRatings();
  }

  applyPageApproved(){
    this.getApprovedUserRatings();
  }
  applyPageNotApprovedYet(){
    this.getNotApprovedYetUserRatings();
  }
  applyPageRejected(){
    this.getRejectedUserRatings();
  }


  resetPageApproved(){
    this.orderBy="createdAt";
    this.getApprovedUserRatings();
  }

  resetPageNotApprovedYet(){
    this.orderBy="createdAt";
    this.getNotApprovedYetUserRatings();
  }

  resetPageRejected(){
    this.orderBy="createdAt";
    this.getRejectedUserRatings();
  }

}
