import { Component, OnInit } from '@angular/core';
import { Ad } from 'src/app/models/ad';
import { Category } from 'src/app/models/category';
import { Pagination } from 'src/app/models/pagination';
import { AdminService } from 'src/app/services/admin.service';
import { AdsService } from 'src/app/services/ads.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-approve-ads',
  templateUrl: './approve-ads.component.html',
  styleUrls: ['./approve-ads.component.css']
})
export class ApproveAdsComponent implements OnInit {

  ads:Ad[];
  pagination:Pagination;
  pageNumber=1;
  pageSize=10;
  orderBy='createdAt';
  categoryId:number;
  categoryList:Category[];

  constructor(
    private adminService:AdminService, 
    private categoryService:CategoriesService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(response=>{
      this.categoryList= response;
      this.categoryId=0;
      this.getAds();
    })
  }

  
  apply(){
    console.log(this.categoryId);
    this.getAds();

  }
  reset(){
    this.categoryId=0;
    this.orderBy="createdAt";
    this.getAds();
  }

  getAds(){
    this.adminService.getInactiveAds(this.pageNumber,this.pageSize, this.categoryId, this.orderBy).subscribe(response=>{
      this.ads=response.result;
      this.pagination = response.pagination;
    })
  }

  changePage(event:any){
    this.pageNumber = event.page;
    this.getAds();
  }

}
