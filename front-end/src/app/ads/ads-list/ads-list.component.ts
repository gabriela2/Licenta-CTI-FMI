import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Ad } from 'src/app/models/ad';
import { AdsService } from 'src/app/services/ads.service';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.css']
})
export class AdsListComponent implements OnInit {
  ads:Ad[];

  constructor(private adService:AdsService) { }

  ngOnInit(): void {
    this.getAds();
  }

  getAds(){
    this.adService.getAds().pipe(
      map( response =>response.filter((ad:Ad)=>ad.isActive ===true))
    ).subscribe(ads=>{
        this.ads=ads;
      })
  }

}
