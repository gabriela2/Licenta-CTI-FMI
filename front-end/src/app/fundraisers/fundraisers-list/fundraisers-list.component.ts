import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Fundraiser } from 'src/app/models/fundraiser';
import { FundraisersService } from 'src/app/services/fundraisers.service';

@Component({
  selector: 'app-fundraisers-list',
  templateUrl: './fundraisers-list.component.html',
  styleUrls: ['./fundraisers-list.component.css']
})
export class FundraisersListComponent implements OnInit {

  fundraisers: Fundraiser[];
  constructor(private fundraiserService:FundraisersService) { }

  ngOnInit(): void {
    this.getFundraisers();
  }

  getFundraisers(){
    this.fundraiserService.getFundraisers().pipe(
      map(response=> response.filter((fundraiser:Fundraiser)=>fundraiser.isValidated === true))
    ).subscribe(fundraisers=>{
      this.fundraisers=fundraisers;
    })
    
  }

}
