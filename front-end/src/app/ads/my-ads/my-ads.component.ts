import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Ad } from 'src/app/models/ad';
import Member from 'src/app/models/member';
import { AdsService } from 'src/app/services/ads.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.css']
})
export class MyAdsComponent implements OnInit {

  currentUserId:number;
  member:Member;
  activeAds:Ad[];
  inactiveAds:Ad[];
  
  constructor(private router:Router, private memberService:MembersService, private adService:AdsService) { 
    this.currentUserId = parseInt(localStorage.getItem('userId')); 
  }

  ngOnInit(): void {
    this.loadActiveAds();
    this.loadInactiveAds();
  }

  loadActiveAds(){
    this.adService.getAds().pipe(
      map( response =>response.filter((ad:Ad)=>ad.isActive ===true && ad.userId===this.currentUserId))
    ).subscribe(ads=>{
        this.activeAds=ads;
      })
  }

  loadInactiveAds(){
    this.adService.getAds().pipe(
      map( response =>response.filter((ad:Ad)=>ad.isActive ===false && ad.userId===this.currentUserId))
    ).subscribe(ads=>{
        this.inactiveAds=ads;
      })
  }

  addNewAd()
  {
    this.router.navigateByUrl('/add-ad');

  }
}
