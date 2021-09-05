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
  flag=false;
  rating:UserRating;
  title:string;
  comment:string;
  nrstart:number;

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

  canDeactivateFunction(){
    if(!this.flag)
    return false;
    }

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
      this.title=result.title;
      this.comment=result.comment;
      this.nrstart=result.rating;
    })
  }
  cancel(){
    this.router.navigateByUrl('/member-profile/'+this.rating.receiverId+'?tab=2');
  }
  update(){
    if(this.rating.comment === this.comment && this.rating.title === this.title && this.rating.rating===this.nrstart){
      this.router.navigateByUrl('/member-profile/'+this.rating.receiverId+'?tab=2');
    }else{

    
    this.rating.isRejected=false;
    this.rating.isValidated=false;
    this.userRatingService.put(this.rating.id, this.rating).subscribe();
    this.router.navigateByUrl('/member-profile/'+this.rating.receiverId+'?tab=2');
    this.editRating.reset(this.rating);}
  }

}