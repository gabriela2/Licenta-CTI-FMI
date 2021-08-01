import { Component, Input, OnInit } from '@angular/core';
import { Ad } from 'src/app/models/ad';
import { FavouriteList } from 'src/app/models/favouriteList';
import { FavouriteListService } from 'src/app/services/favourite-list.service';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.css']
})
export class AdCardComponent implements OnInit {

  @Input() ad:Ad;
  constructor(private favouriteListService: FavouriteListService) { }
  userId:number;
  favouriteList:FavouriteList[];
  flag:boolean=false;
  favorite:FavouriteList;

  ngOnInit(): void {
    this.userId = parseInt(localStorage.getItem('userId'));
    this.favouriteListService.getFavouriteLists(this.userId).subscribe( response=>{
      this.favouriteList=response;
      console.log(this.favouriteList, this.userId, this.ad);
      for(const item of response){
        console.log('aici sosis',item);
        if(item.adId==this.ad.id){
          this.flag=true;
        }
      }
      console.log(this.flag);
    });
  }

  toggleFavourite() {
    if(this.flag==true){
      this.favouriteListService.getFavouriteAd(this.userId,this.ad.id).subscribe(result=>{
        this.favorite=result;
        this.favouriteListService.deleteFavouriteList(this.favorite.id).subscribe();
         this.flag=false;
      })
    }else{
       var favouriteList = {
        id:0,
        adId: this.ad.id,
        userId:this.userId,
      };
      console.log(favouriteList);
      this.favouriteListService.postFavouriteList(favouriteList).subscribe();
      this.flag=true;
      }
      

    }
}
