import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ad } from 'src/app/models/ad';
import { DeliveryType } from 'src/app/models/deliveryType';
import { Demand } from 'src/app/models/demand';
import { HelperDelivery } from 'src/app/models/HelperDelivery';
import { Pagination } from 'src/app/models/pagination';
import { AdsService } from 'src/app/services/ads.service';
import { DeliveryTypesService } from 'src/app/services/delivery-types.service';
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
  demands: Demand[] = [];
  unapprovedDemands: Demand[] = [];

  paginationAll: Pagination;
  pageNumberAll = 1;
  paginationUnapproved: Pagination;
  pageNumberUnapproved = 1;
  pageSize = 10;
  orderBy = 'createdAt';
  sortBy = 'isDeclined';
  deliveryTypeSelected='toate';
  deliveryTypeList:HelperDelivery[]=[];

  constructor(
    private demandSercice: DemandsService,
    private deliveryTypeService:DeliveryTypesService,
    private route: ActivatedRoute,
    private adService:AdsService

  ) { }

  ngOnInit(): void {
    this.loadAd();
  }


  loadAd() {
    this.route.params.subscribe((params) => {
      this.adId = params['id'];
    })
    this.adService.getAd(this.adId).subscribe(ad => {
      this.ad = ad;
      for(const item of this.ad.ad_x_DeliveryType){
        var obj={id:item.deliveryTypeId,name:item.deliveryType,checked:true};
      this.deliveryTypeList.push(obj);
      }
      console.log(this.deliveryTypeList);
      this.loadAllDemands();
      this.loadUnapprovedDemands();
    })
  }

  loadAllDemands() {
    this.route.params.subscribe((params) => {
      this.adId = params['id'];
    });
    this.demandSercice.getAllDemandsByAdId(this.adId, this.pageNumberAll, this.pageSize, this.orderBy, this.sortBy, this.deliveryTypeSelected).subscribe(response => {
      this.demands = response.result;
      this.paginationAll = response.pagination;
    });
  }


  loadUnapprovedDemands(){
    this.route.params.subscribe((params) => {
      this.adId = params['id'];
    });

    this.demandSercice.getUnapprovedDemandsByAdId(this.adId, this.pageNumberUnapproved, this.pageSize, this.orderBy).subscribe(response => {
      this.unapprovedDemands = response.result;
      this.paginationUnapproved = response.pagination;
    })

  }

  changePageAll(event:any){
    this.pageNumberAll = event.page;
    this.loadAllDemands();
  }
  changePageNotApprovedYet(event:any){
    this.pageNumberUnapproved = event.page;
    this.loadUnapprovedDemands();
  }

  applyPageAll(){
    this.loadAllDemands();
  }
  applyPageNotApprovedYet(){
    this.loadUnapprovedDemands();
  }


  resetPageAll(){
    this.sortBy = 'isDeclined';
    this.orderBy="createdAt";
    this.deliveryTypeSelected='toate';
    this.loadAllDemands();
  }
  resetPageNotApprovedYet(){
    this.orderBy="createdAt";
    this.loadUnapprovedDemands();
  }





}
