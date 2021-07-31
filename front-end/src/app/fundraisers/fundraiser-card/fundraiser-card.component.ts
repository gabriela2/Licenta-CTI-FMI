import { Component, Input, OnInit } from '@angular/core';
import { FavouriteList } from 'src/app/models/favouriteList';
import { Fundraiser } from 'src/app/models/fundraiser';
import { FavouriteListService } from 'src/app/services/favourite-list.service';

@Component({
  selector: 'app-fundraiser-card',
  templateUrl: './fundraiser-card.component.html',
  styleUrls: ['./fundraiser-card.component.css']
})
export class FundraiserCardComponent implements OnInit {

  @Input() fundraiser: Fundraiser;
  constructor(private favouriteListService: FavouriteListService) { }
  userId:number;
  favouriteList:FavouriteList[];
  flag:boolean=false;
  favorite:FavouriteList;

  ngOnInit(): void {
    this.userId = parseInt(localStorage.getItem('userId'));
    this.favouriteListService.getFavouriteLists(this.userId).subscribe( response=>{
      this.favouriteList=response;
      console.log(this.favouriteList, this.userId, this.fundraiser);
      for(const item of response){
        if(item.fundraiserId==this.fundraiser.id){
          this.flag=true;
        }
      }
      console.log(this.flag);
    });
    
  }

  toggleFavourite() {
    if(this.flag==true){
      this.favouriteListService.getFavouriteFundraiser(this.userId,this.fundraiser.id).subscribe(result=>{
        this.favorite=result;
        this.favouriteListService.deleteFavouriteList(this.favorite.id).subscribe();
         this.flag=false;
      })
    }else{
       var favouriteList = {
        id:0,
        fundraiserId: this.fundraiser.id,
        userId:this.userId,
      };
      console.log(favouriteList);
      this.favouriteListService.postFavouriteList(favouriteList).subscribe();
      this.flag=true;
      }
    }
  }


