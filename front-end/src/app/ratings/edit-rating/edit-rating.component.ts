import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserRating } from "src/app/models/userRating";
import { UserRatingsService } from "src/app/services/user-ratings.service";

@Component({
  selector: 'app-edit-rating',
  templateUrl: './edit-rating.component.html',
  styleUrls: ['./edit-rating.component.css']
})
export class EditRatingComponent implements OnInit {
  ratingId:number;
  rating:UserRating;
  @ViewChild('editRating') editRating:NgForm;
  @HostListener("window:beforeunload", ["$event"])
  beforeUnloadHandler(event: any) {
  if (this.editRating.dirty) {
    event.returnValue = true;
  }
}
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private userRatingService: UserRatingsService) { }

  

  ngOnInit(): void {
    this.loadUserRating();
    console.log(this.rating);
  }

  loadUserRating(){
    this.route.params.subscribe((params) => {
      this.ratingId = params['id'];
    })
    console.log("this.ratingId = ", this.ratingId);
    this.userRatingService.getUserRating(this.ratingId).subscribe(result=>{
      this.rating=result;
    })
  }
  cancel(){
    this.router.navigateByUrl('/member-profile/'+this.rating.receiverId);
  }
  update(){
    this.userRatingService.put(this.rating.id, this.rating).subscribe();
    this.router.navigateByUrl('/member-profile/'+this.rating.receiverId);
    this.editRating.reset(this.rating);
  }

}