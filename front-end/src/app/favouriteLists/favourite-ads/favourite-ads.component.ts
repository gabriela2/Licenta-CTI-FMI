import { Component, Input, OnInit } from '@angular/core';
import { Ad } from 'src/app/models/ad';
import { FavouriteList } from 'src/app/models/favouriteList';
import { AdsService } from 'src/app/services/ads.service';
import { FavouriteListService } from 'src/app/services/favourite-list.service';

@Component({
  selector: 'app-favourite-ads',
  templateUrl: './favourite-ads.component.html',
  styleUrls: ['./favourite-ads.component.css']
})
export class FavouriteAdsComponent implements OnInit {

  @Input() favouriteAd: FavouriteList;
  ad: Ad;
  flag: true;
  constructor(private adService: AdsService, private favouriteListService: FavouriteListService) { }

  ngOnInit(): void {
    this.loadAd();
  }

  loadAd() {
    this.adService.getAd(this.favouriteAd.adId).subscribe(response => {
      this.ad = response;
    })
  }

  toggleFavourite() {
    this.favouriteListService.deleteFavouriteList(this.favouriteAd.id).subscribe();
    window.location.reload();
  }

}
