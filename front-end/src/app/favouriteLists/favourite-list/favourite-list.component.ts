import { Component, OnInit } from '@angular/core';
import { FavouriteList } from '../../models/favouriteList';
import { Pagination } from '../../models/pagination';
import { FavouriteListService } from '../../services/favourite-list.service';

@Component({
  selector: 'app-favourite-list',
  templateUrl: './favourite-list.component.html',
  styleUrls: ['./favourite-list.component.css']
})
export class FavouriteListComponent implements OnInit {

  currentUserId:number;
  favouriteList:FavouriteList[];
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 10;

  constructor(private favouriteListService:FavouriteListService) { 
    this.currentUserId=parseInt(localStorage.getItem('userId'));
  }

  ngOnInit(): void {
    this.loadFavouriteListByUserId();
  }
  loadFavouriteListByUserId(){
    this.favouriteListService.getFavouriteListByUserId(this.currentUserId,this.pageNumber,this.pageSize).subscribe(response=>{
      this.favouriteList=response.result;
      this.pagination = response.pagination;
      console.log(this.favouriteList);
    })
  }
  changePage(event:any){
    this.pageNumber = event.page;
    this.loadFavouriteListByUserId();
  }

}
