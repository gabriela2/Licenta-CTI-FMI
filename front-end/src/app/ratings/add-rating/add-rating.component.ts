import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRating } from 'src/app/models/userRating';
import { UserRatingsService } from 'src/app/services/user-ratings.service';

@Component({
  selector: 'app-add-rating',
  templateUrl: './add-rating.component.html',
  styleUrls: ['./add-rating.component.css']
})
export class AddRatingComponent implements OnInit {


  receiverUserId:number;
  currentUserLogged:number;
  rating:number;
  title:string;
  comment:string;

  userRating:UserRating;


  @ViewChild('addRating') addRating:NgForm;
  @HostListener("window:beforeunload", ["$event"])
beforeUnloadHandler(event: any) {
  if (this.addRating.touched) {
    event.returnValue = true;
  }
}

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userRatingService: UserRatingsService) { this.userRating}
    

  ngOnInit(): void {
    this.rating=0;
    this.route.params.subscribe((params) => {
      this.receiverUserId = params['id'];
    })
    this.currentUserLogged = parseInt(localStorage.getItem('userId'));
  }

  addUserRating(){
    console.log('receiver',this.receiverUserId);
    console.log('current',this.currentUserLogged);
    var userRating ={
      id:0,
      rating:this.rating,
      comment:this.comment,
      title:this.title,
      createdAt: new Date(),
      receiverId:this.receiverUserId,
      senderId:this.currentUserLogged,
      isValidated:false,
      isRejected:false,
    };
    console.log("this var user = ", userRating);
    this.userRatingService.post(userRating).subscribe();

    this.router.navigateByUrl('/member-profile/'+this.receiverUserId+'?tab=2');
    
  }
  cancel(){
    this.router.navigateByUrl('/member-profile/'+this.receiverUserId+'?tab=2');
  }

}
