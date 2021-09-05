import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Ad } from 'src/app/models/ad';
import { Category } from 'src/app/models/category';
import Member from 'src/app/models/member';
import { Pagination } from 'src/app/models/pagination';
import { AdsService } from 'src/app/services/ads.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.css']
})
export class MyAdsComponent implements OnInit {

  paginationActive: Pagination;
  paginationInactive: Pagination;
  paginationNotApprovedYet: Pagination;
  paginationRejected: Pagination;
  pageNumberActive = 1;
  pageNumberInactive = 1;
  pageNumberNotApprovedYet = 1;
  pageNumberRejected = 1;
  pageSize = 10;
  orderBy = 'createdAt';
  categoryId: number;
  categoryList: Category[];

  currentUserId: number;
  member: Member;
  ad: Ad;
  activeAds: Ad[];
  inactiveAds: Ad[];
  notApprovedYetAds: Ad[];
  rejectedAds: Ad[];
  localAd: Ad[];
  currentNoOfDemandsForActive: number = 0;
  currentNoOfDemandsForInactive: number = 0;

  constructor(
    private adService: AdsService,
    private categoryService: CategoriesService) {
    this.currentUserId = parseInt(localStorage.getItem('userId'));
  }

  ngOnInit(): void {
    this.getCategories();
    this.computeNoDemands();
  }
  computeNoDemands() {
    this.adService.getAdsByUserId(this.currentUserId).subscribe(resposne => {
      for (var item of resposne) {
        for (var item2 of item.demands) {
          if (item2.isApproved === false) {
            if (item.isActive === true) {
              this.currentNoOfDemandsForActive += 1;
            } else {
              this.currentNoOfDemandsForInactive += 1;
            }
          }
        }
      }
    })
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(response => {
      this.categoryList = response;
      this.categoryId = 0;
      this.loadActiveAds();
      this.loadInactiveAds();
      this.loadRejectedAds();
      this.loadNotApprovedYetAds();
    })
  }

  changePageActive(event: any) {
    this.pageNumberActive = event.page;
    this.loadActiveAds();
  }
  changePageInactive(event: any) {
    this.pageNumberInactive = event.page;
    this.loadInactiveAds();
  }
  changePageRejected(event: any) {
    this.pageNumberRejected = event.page;
    this.loadRejectedAds();
  }
  changePageNotApprovedYet(event: any) {
    this.pageNumberNotApprovedYet = event.page;
    this.loadNotApprovedYetAds();
  }


  loadRejectedAds() {
    this.adService.getRejectedAdsByUserId(this.currentUserId, this.pageNumberRejected, this.pageSize, this.categoryId, this.orderBy).subscribe(response => {
      this.rejectedAds = response.result;
      this.paginationRejected = response.pagination;
    })
  }

  loadNotApprovedYetAds() {
    this.adService.getNotApprovedYetAdsByUserId(this.currentUserId, this.pageNumberNotApprovedYet, this.pageSize, this.categoryId, this.orderBy).subscribe(response => {
      this.notApprovedYetAds = response.result;
      this.paginationNotApprovedYet = response.pagination;
      console.log(this.notApprovedYetAds);
    })
  }

  loadActiveAds() {
    this.adService.getActiveAdsByUserId(this.currentUserId, this.pageNumberActive, this.pageSize, this.categoryId, this.orderBy).subscribe(response => {
      this.activeAds = response.result;
      this.paginationActive = response.pagination;
    })
  }

  loadInactiveAds() {
    this.adService.getInactiveAdsByUserId(this.currentUserId, this.pageNumberInactive, this.pageSize, this.categoryId, this.orderBy).subscribe(response => {
      this.inactiveAds = response.result;
      this.paginationInactive = response.pagination;
    })
  }




  applyActive() {
    this.loadActiveAds();

  }
  resetActive() {
    this.categoryId = 0;
    this.orderBy = "createdAt";
    this.loadActiveAds();
  }

  applyInactive() {
    this.loadInactiveAds();

  }
  resetInactive() {
    this.categoryId = 0;
    this.orderBy = "createdAt";
    this.loadInactiveAds();
  }


  applyRejected() {
    this.loadRejectedAds();

  }
  resetRejected() {
    this.categoryId = 0;
    this.orderBy = "createdAt";
    this.loadRejectedAds();
  }


  applyNotApprovedYet() {
    this.loadNotApprovedYetAds();

  }
  resetNotApprovedYet() {
    this.categoryId = 0;
    this.orderBy = "createdAt";
    this.loadNotApprovedYetAds();
  }
}
