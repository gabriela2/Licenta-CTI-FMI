import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/models/address';
import { Fundraiser } from 'src/app/models/fundraiser';
import Member from 'src/app/models/member';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { FundraisersService } from 'src/app/services/fundraisers.service';
import { ActivatedRoute } from '@angular/router';
import { AddressesService } from 'src/app/services/addresses.service';
import { MembersService } from 'src/app/services/members.service';
import { ProgressbarConfig } from 'ngx-bootstrap/progressbar';
import { FavouriteList } from 'src/app/models/favouriteList';
import { FavouriteListService } from 'src/app/services/favourite-list.service';


@Component({
  selector: 'app-fundraiser-detail',
  templateUrl: './fundraiser-detail.component.html',
  styleUrls: ['./fundraiser-detail.component.css']
})
export class FundraiserDetailComponent implements OnInit {


  fundraiser: Fundraiser;
  fundraiserId: number;
  userId: number;
  userOwner: Member;
  address: Address;
  phoneNumber: string = "Suna utilizatorul";
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  procent:number;
  flag: boolean = false;
  favorite: FavouriteList;
  favouriteList: FavouriteList[];
  currentUserLogged: number;

  constructor(
    private fundraiserService: FundraisersService,
    private route: ActivatedRoute,
    private addressService: AddressesService,
    private memberService: MembersService,
    private config:ProgressbarConfig,
    private favouriteListService: FavouriteListService
  ) { 
    config.animate=true;
  }

  ngOnInit(): void {
    this.currentUserLogged = parseInt(localStorage.getItem('userId'));
    console.log("this.currentUserLogged = ", this.currentUserLogged);
    this.loadFundraiser();
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]
  }

  toggleFavourite() {
    if (this.flag == true) {
      console.log(this.currentUserLogged, this.fundraiser.id);
      this.favouriteListService.getFavouriteFundraiser(this.currentUserLogged, this.fundraiser.id).subscribe(result => {
        this.favorite = result;
        this.favouriteListService.deleteFavouriteList(this.favorite.id).subscribe();
        this.flag = false;
      })
    } else {
      var favouriteList = {
        id: 0,
        fundraiserId: this.fundraiser.id,
        userId: this.currentUserLogged,
      };
      console.log(favouriteList);
      this.favouriteListService.postFavouriteList(favouriteList).subscribe();
      this.flag = true;
    }

  }

  showPhoneNumber() {
    this.phoneNumber = this.userOwner.phoneNumber;
  }

  getImages(): NgxGalleryImage[] {
    const images = [];
    for (const photo of this.fundraiser.photos) {
      images.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      })
    }
    console.log("Imagini", images.length);
    if (images.length < 1) {
      images.push({
        small: './assets/product.png',
        medium: './assets/product.png',
        big: './assets/product.png',
      })
    }
    return images;
  }

  loadAddress() {
    this.addressService.getAddressByUserId(this.userId).subscribe(address => {
      this.address = address;
      console.log("this.address = ", this.address);
      this.config.max=this.fundraiser.targetAmount;
    })
  }

  loadMember() {
    console.log("this.userId from LoadMember = ", this.userId);
    this.memberService.getMember(this.userId).subscribe(user => {
      this.userOwner = user;
      console.log("userOwner = ", this.userOwner);
    })
  }

  loadFundraiser() {
    this.route.params.subscribe((params) => {
      this.fundraiserId = params['id'];
    })
    console.log("this.fundraiserId = ", this.fundraiserId);

    this.fundraiserService.getFundraiser(this.fundraiserId).subscribe(fundraiser => {
      this.fundraiser = fundraiser;
      console.log("this.fundraiser = ", this.fundraiser);
      this.userId = fundraiser.userId;
      console.log("this.userId = ", this.userId);
      this.galleryImages = this.getImages();
      this.loadMember();
      this.loadAddress();
      this.procent=(this.fundraiser.currentAmount/this.fundraiser.targetAmount)*100;
      console.log(this.procent);
      this.favouriteListService.getFavouriteFundraiser(this.currentUserLogged, this.fundraiser.id).subscribe(result => {
        this.favorite = result;
        console.log(this.favorite);
        if (this.favorite == null) {
          this.flag = false;
        }
        else { this.flag = true }
      })
    })
  }



}
