import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ad } from 'src/app/models/ad';
import { Demand } from 'src/app/models/demand';
import { AdsService } from 'src/app/services/ads.service';
import { DemandsService } from 'src/app/services/demands.service';

@Component({
  selector: 'app-view-demands',
  templateUrl: './view-demands.component.html',
  styleUrls: ['./view-demands.component.css']
})
export class ViewDemandsComponent implements OnInit {

  currentUserLogged: number;
  adId: number;
  ad: Ad;
  demands: Demand[]=[];
  unapprovedDemands: Demand[]=[];

  constructor(
    private adService: AdsService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.currentUserLogged = parseInt(localStorage.getItem('userId'));
    console.log("this.currentUserLogged = ", this.currentUserLogged);
    this.loadAd();
  }

  loadAd() {
    this.route.params.subscribe((params) => {
      this.adId = params['id'];
    })
    this.adService.getAd(this.adId).subscribe(ad => {
      this.ad = ad;
      console.log(this.ad);
      for(const demand of ad.demands){
        console.log(demand);
        if(demand.isApproved===true){
          this.demands.push(demand);
        }
        if(demand.isApproved===false){
          this.unapprovedDemands.push(demand);
        }
      }
    })
  }


}
