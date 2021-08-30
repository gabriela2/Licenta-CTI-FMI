import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Ad } from 'src/app/models/ad';
import { Demand } from 'src/app/models/demand';
import { AdsService } from 'src/app/services/ads.service';
import { DemandsService } from 'src/app/services/demands.service';

@Component({
  selector: 'app-ad-card-for-my-ads',
  templateUrl: './ad-card-for-my-ads.component.html',
  styleUrls: ['./ad-card-for-my-ads.component.css']
})
export class AdCardForMyAdsComponent implements OnInit {

  @Input() ad:Ad;
  demandsNr: number=0;

  constructor(private adService:AdsService) { }

  ngOnInit(): void {
    this.computeDemandsNr();
  }

  computeDemandsNr(){
    if(this.ad.demands.length==0){
      this.demandsNr = 0;
    }
    else{
      for(var item of this.ad.demands){
        if(item.isApproved===false && item.isDeclined===false){
          this.demandsNr=this.demandsNr+1;
        }
      }
    }
  }

  deleteAd(){
    this.adService.deleteAd(this.ad.id).subscribe();
    window.location.reload();
  }
  }


