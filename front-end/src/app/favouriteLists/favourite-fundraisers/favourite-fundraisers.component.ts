import { Component, Input, OnInit } from '@angular/core';
import { windowWhen } from 'rxjs/operators';
import { FavouriteList } from 'src/app/models/favouriteList';
import { Fundraiser } from 'src/app/models/fundraiser';
import { FavouriteListService } from 'src/app/services/favourite-list.service';
import { FundraisersService } from 'src/app/services/fundraisers.service';

@Component({
  selector: 'app-favourite-fundraisers',
  templateUrl: './favourite-fundraisers.component.html',
  styleUrls: ['./favourite-fundraisers.component.css']
})
export class FavouriteFundraisersComponent implements OnInit {

  @Input() favouriteFundraiser: FavouriteList;
  fundraiser: Fundraiser;
  flag: true;
  constructor(private fundraiserService: FundraisersService, private favouriteListService: FavouriteListService) { }

  ngOnInit(): void {
    this.loadFundraiser();
  }

  loadFundraiser() {
    this.fundraiserService.getFundraiser(this.favouriteFundraiser.fundraiserId).subscribe(response => {
      this.fundraiser = response;
    })
  }

  toggleFavourite() {
    this.favouriteListService.deleteFavouriteList(this.favouriteFundraiser.id).subscribe();
    window.location.reload();
  }

}
