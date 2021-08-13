import { Component, Input, OnInit } from '@angular/core';
import { Ad } from 'src/app/models/ad';
import { Demand } from 'src/app/models/demand';
import { AdsService } from 'src/app/services/ads.service';

@Component({
  selector: 'app-demand-card-approved-for-my-demands',
  templateUrl: './demand-card-approved-for-my-demands.component.html',
  styleUrls: ['./demand-card-approved-for-my-demands.component.css']
})
export class DemandCardApprovedForMyDemandsComponent implements OnInit {

  @Input() demand:Demand;
  ad:Ad;
  constructor(private adService:AdsService) { }

  ngOnInit(): void {
    this.getAd();
  }
  getAd(){
    this.adService.getAd(this.demand.adId).subscribe(response=>{
      this.ad=response;
    })
  }

}
