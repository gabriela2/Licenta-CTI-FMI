import { Component, OnInit } from '@angular/core';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ad } from 'src/app/models/ad';
import { Address } from 'src/app/models/address';
import { Ad_x_DeliveryType } from 'src/app/models/ad_x_deliveryType';
import { Demand } from 'src/app/models/demand';
import Member from 'src/app/models/member';
import { AddressesService } from 'src/app/services/addresses.service';
import { AdsService } from 'src/app/services/ads.service';
import { DemandsService } from 'src/app/services/demands.service';
import { MembersService } from 'src/app/services/members.service';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { FavouriteList } from 'src/app/models/favouriteList';
import { FavouriteListService } from 'src/app/services/favourite-list.service';



@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.css']
})
export class AdDetailComponent implements OnInit {
  ad: Ad;
  adId: number;
  deliveryType: any;
  deliveries: Ad_x_DeliveryType[];
  demand: Demand;
  quantityRequested: number;
  deliveryTypeSelected: any;
  userId: number;
  userOwner: Member;
  address: Address;
  phoneNumber: string = "Suna utilizatorul";
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  flag: boolean = false;
  favorite: FavouriteList;
  favouriteList: FavouriteList[];
  currentUserLogged: number;
  content :string;



  constructor(
    private adService: AdsService,
    private memberService: MembersService,
    private route: ActivatedRoute,
    private demandService: DemandsService,
    private toastr: ToastrService,
    private addressService: AddressesService,
    private favouriteListService: FavouriteListService
  ) { }

  ngOnInit(): void {

    this.currentUserLogged = parseInt(localStorage.getItem('userId'));
    console.log("this.currentUserLogged = ", this.currentUserLogged);
    this.loadAd();
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

  showPhoneNumber() {
    this.phoneNumber = this.userOwner.phoneNumber;
  }

  toggleFavourite() {
    if (this.flag == true) {
      console.log(this.currentUserLogged, this.ad.id);
      this.content = 'Adauga in lista de favorite.';
      this.favouriteListService.getFavouriteAd(this.currentUserLogged, this.ad.id).subscribe(result => {
        this.favorite = result;
        this.favouriteListService.deleteFavouriteList(this.favorite.id).subscribe();
        this.flag = false;
      })
    } else {
      this.content = 'Elimina din lista de favorite.';
      var favouriteList = {
        id: 0,
        adId: this.ad.id,
        userId: this.currentUserLogged,
      };
      console.log(favouriteList);
      this.favouriteListService.postFavouriteList(favouriteList).subscribe();
      this.flag = true;
    }

  }



  getImages(): NgxGalleryImage[] {
    const images = [];
    for (const photo of this.ad.photos) {
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
    })
  }

  loadMember() {
    console.log("this.userId from LoadMember = ", this.userId);
    this.memberService.getMember(this.userId).subscribe(user => {
      this.userOwner = user;
      console.log("userOwner = ", this.userOwner);
    })

  }


  loadAd() {
    this.route.params.subscribe((params) => {
      this.adId = params['id'];
    })
    console.log("this.adId = ", this.adId);

    this.adService.getAd(this.adId).subscribe(ad => {
      this.ad = ad;
      console.log("this.ad = ", this.ad);
      this.userId = ad.userId;
      console.log("this.userId = ", this.userId);
      this.deliveries = ad.ad_x_DeliveryType;
      this.galleryImages = this.getImages();
      this.loadMember();
      this.loadAddress();
      this.favouriteListService.getFavouriteAd(this.currentUserLogged, this.ad.id).subscribe(result => {
        this.favorite = result;
        console.log(this.favorite);
        if (this.favorite == null) {
          this.flag = false;
          this.content = 'Adauga in lista de favorite.';
        }
        else { 
          this.flag = true;
          this.content = 'Elimina din lista de favorite.'; 
        }
      })
    })

  }

  selected(item: any) {
    console.log(item);
    console.log(this.deliveryTypeSelected);
  }


  apply() {
    var demand = {
      createdAt: new Date(),
      quantityRequested: this.quantityRequested,
      isApproved: false,
      isDeclined:false,
      deliveryTypeSelected: this.deliveryTypeSelected,
      adId: this.ad.id,
      userId: this.currentUserLogged
    };

    if (this.deliveryTypeSelected && this.quantityRequested) {
      if (this.ad.userId == this.currentUserLogged) {
        this.toastr.error("Nu va este permisa efectuarea acestei cereri.In cazul in care doriti sa modificati acest anunt, va rugam sa accesati pagina dedicata!");
      } else {
        this.demandService.post(demand).subscribe();
        this.ad.quantity = this.ad.quantity - this.quantityRequested;

        if (this.ad.quantity == 0) {
          this.ad.isActive = false;
        }

        this.adService.put(this.ad.id, this.ad).subscribe();
        this.toastr.info("Cererea dvs. a fost inregistrata!");
      }
    }
    else {
      this.toastr.warning("Toate campurile trebuie completate");
    }

  }

}
