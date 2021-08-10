import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Fundraiser } from 'src/app/models/fundraiser';
import { Pagination } from 'src/app/models/pagination';
import { FundraisersService } from 'src/app/services/fundraisers.service';

@Component({
  selector: 'app-fundraisers-list',
  templateUrl: './fundraisers-list.component.html',
  styleUrls: ['./fundraisers-list.component.css']
})
export class FundraisersListComponent implements OnInit {

  fundraisers: Fundraiser[];
  pagination:Pagination;
  pageNumber=1;
  pageSize=10;
  orderBy='createdAt';
  constructor(private fundraiserService:FundraisersService) { }

  ngOnInit(): void {
    this.getFundraisers();
  }

  getFundraisers(){
    this.fundraiserService.getFundraisers(this.pageNumber, this.pageSize,this.orderBy).subscribe(response=>{
      this.fundraisers=response.result;
      this.pagination=response.pagination;
    })
    
  }
  apply(){
    this.getFundraisers();

  }
  reset(){
    this.orderBy="createdAt";
    this.getFundraisers();
  }
  changePage(event:any){
    this.pageNumber = event.page;
    this.getFundraisers();
  }

}
