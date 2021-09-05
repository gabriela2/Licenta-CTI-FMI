import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
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
import { CategoriesService } from 'src/app/services/categories.service';
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
  reviews: UserRating[];
  paginationAd:Pagination;
  pageNumberAd=1;
  paginationFundraiser:Pagination;
  pageNumberFundraisers=1;
  paginationUserRating:Pagination;
  pageNumberUserRating=1;
  pageSize=10;
  orderBy='createdAt';
  categoryId:number;
  categoryList:Category[];
  ratingList:number[]=[1,2,3,4,5];
  rating=0; @ViewChild('memberTabs', {static:true}) memberTabs: TabsetComponent;
  activeTab: TabDirective;

 
  



  constructor(
    private route: ActivatedRoute,
    private memberService: MembersService,
    private addressService: AddressesService,
    private adsService: AdsService,
    private fundraisersService: FundraisersService,
    private ratingsService: UserRatingsService,
    private toastr: ToastrService,
    private router: Router,
    private categoryService:CategoriesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    })
    this.route.data.subscribe(data=>{
      this.member = data.member;
    })
    this.loadAddress();
    this.loadFundraisers();
    this.loadRatings();
    this.getCategories();
    this.route.queryParams.subscribe(params=>{
      params.tab? this.selectTab(params.tab):this.selectTab(0);
    })
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(response=>{
      this.categoryList= response;
      this.categoryId=0;
      this.getAds();
    })
  }

  applyAd(){
    console.log(this.categoryId);
    this.getAds();

  }
  resetAd(){
    this.categoryId=0;
    this.orderBy="createdAt";
    this.getAds();
  }

  changePageAd(event:any){
    this.pageNumberAd = event.page;
    this.getAds();
  }

  applyUserRating(){
    this.loadRatings()

  }
  resetUserRating(){
    this.rating=0;
    this.orderBy="createdAt";
    this.loadRatings();
  }

  changePageUserRating(event:any){
    this.pageNumberUserRating = event.page;
    this.loadRatings();
  }

  applyFundraisers(){
    console.log(this.categoryId);
    this.loadFundraisers();

  }
  resetFundraisers(){
    this.orderBy="createdAt";
    this.loadFundraisers();
  }

  changePageFundraisers(event:any){
    this.pageNumberFundraisers = event.page;
    this.loadFundraisers();
  }

  getAds(){
    this.adsService.getActiveAdsByUserId(this.userId,this.pageNumberAd,this.pageSize, this.categoryId, this.orderBy).subscribe(response=>{
      this.ads=response.result;
      this.paginationAd = response.pagination;
    })
  }

 

  showPhoneNumber() {
    this.phoneNumber = this.member.phoneNumber;
  }

  loadAddress() {
    this.addressService.getAddressByUserId(this.userId).subscribe(address => {
      this.address = address;
    })
  }


  loadFundraisers() {
    this.fundraisersService.getApprovedFundraiserByUserId(this.userId,this.pageNumberFundraisers,this.pageSize, this.orderBy).subscribe(response => {
      this.fundraisers = response.result;
      this.paginationFundraiser = response.pagination;
    })
  }

  loadRatings() {
    this.ratingsService.getUserRatingsByReceiverId(this.userId, this.pageNumberUserRating, this.pageSize, this.orderBy,this.rating).subscribe(response => {
      this.ratings = response.result;
      this.paginationUserRating = response.pagination;
    }
    );
    this.ratingsService.getUserRatingByReceiverIdWithoutPag(this.userId).subscribe(response=>{
      this.reviews = response;
    })
  }
  addReview() {
    var flag = false;
    var reviewId;
    var currentUser = parseInt(localStorage.getItem('userId'));
    for (var item of this.reviews) {
      if (item.senderId == currentUser) {
        flag = true;
        reviewId=item.id;
      }
    }

    if (currentUser == this.userId) {
      this.toastr.warning("Nu puteti scrie un review pentru propriul cont");
    } else {

      console.log(flag);
      if (flag == true) {
        this.router.navigateByUrl('edit-rating/'+reviewId);
      } else {
        this.router.navigateByUrl('/add-rating/' + this.userId);
      }
    }
  }

  selectTab(tabId:number){
    this.memberTabs.tabs[tabId].active = true;
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
  }

  redirect(){
    this.router.navigateByUrl('/add-rating/' + this.userId);
  }

}
