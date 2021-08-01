import { Component, Input, OnInit } from '@angular/core';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import Member from '../../models/member';
import { UserRating } from '../../models/userRating';
import { UserRatingsService } from '../../services/user-ratings.service';

@Component({
  selector: 'app-rating-user',
  templateUrl: './rating-user.component.html',
  styleUrls: ['./rating-user.component.css'],
  providers:[NgbRatingConfig]
})
export class RatingUserComponent implements OnInit {

  @Input() member :Member;
  currentRate=0;
  userRating: UserRating[];
  numbers:number[];
  sum=0;
  i=0;


  constructor(private userRatingService:UserRatingsService) { 
  }

  ngOnInit(): void {
   this.loadUserRatings();
  }

  loadUserRatings(){
    this.userRatingService.getUserRatingsByReceiverId(this.member.id).subscribe(result =>{
      this.userRating=result;
      for(var item of result){
        this.sum=this.sum+item.rating;
        this.i=this.i+1;
      }
      this.currentRate=this.sum/this.i;
    })
  }

}
