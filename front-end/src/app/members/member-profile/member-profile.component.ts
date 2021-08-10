import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ad } from 'src/app/models/ad';
import { Address } from 'src/app/models/address';
import { Category } from 'src/app/models/category';
import { Fundraiser } from 'src/app/models/fundraiser';
import Member from 'src/app/models/member';
import { Pagination } from 'src/app/models/pagination';
import { UserRating } from 'src/app/models/userRating';
import { AddressesService } from 'src/app/services/addresses.service';
import { AdsService } from 'src/app/services/ads.service';
import { FundraisersService } from 'src/app/services/fundraisers.service';
import { MembersService } from 'src/app/services/members.service';
import { UserRatingsService } from 'src/app/services/user-ratings.service';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.css']
})
export class MemberProfileComponent implements OnInit {
  userId: number;
  member: Member;
  address: Address;
  phoneNumber: string = "Suna utilizatorul";
  ads: Ad[];
  fundraisers: Fundraiser[];
  ratings: UserRating[];



  constructor(
    private route: ActivatedRoute,
    private memberService: MembersService,
    private addressService: AddressesService,
    private adsService: AdsService,
    private fundraisersService: FundraisersService,
    private ratingsService: UserRatingsService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    })
    // console.log("this.userId = ", this.userId);
    this.loadMember();
  }


  showPhoneNumber() {
    this.phoneNumber = this.member.phoneNumber;
  }

  loadAddress() {
    this.addressService.getAddressByUserId(this.userId).subscribe(address => {
      this.address = address;
      // console.log("this.address = ", this.address);
    })
  }

  loadMember() {
    this.memberService.getMember(this.userId).subscribe(response => {
      this.member = response;
      // console.log(this.member);
    })
    this.loadAddress();
    // this.loadAds();
    this.loadFundraisers();
    this.loadRatings();
  }

  // loadAds() {
  //   this.adsService.getActiveAdsByUserId(this.userId,this.pageNumber,this.pageSize, this.categoryId, this.orderBy).subscribe(response=>{
  //     this.ads=response.result;
  //     this.pagination = response.pagination;
  //   })
  // }

  loadFundraisers() {
    this.fundraisersService.getFundraisersByUserId(this.userId).subscribe(response => {
      this.fundraisers = response;
      // console.log("this.fundraisers=",this.fundraisers);
    })
  }

  loadRatings() {
    this.ratingsService.getUserRatingsByReceiverId(this.userId).subscribe(response => {
      this.ratings = response;
      // console.log("this.ratings=",this.ratings);
    }
    )
  }
  addReview() {
    var flag = false;
    var currentUser = parseInt(localStorage.getItem('userId'));
    for (var item of this.ratings) {
      if (item.senderId == currentUser) {
        flag = true;
      }
    }

    if (currentUser == this.userId) {
      this.toastr.warning("Nu puteti scrie un review pentru propriul cont");
    } else {

      console.log(flag);
      if (flag == true) {
        this.toastr.warning("Ati acordat un review pentru acest utilizator! In cazul in care v-ati schimbat opinia, va rugam sa editati review-ul existent.");
      } else {
        this.router.navigateByUrl('/add-rating/' + this.userId);
      }
    }
  }

}
