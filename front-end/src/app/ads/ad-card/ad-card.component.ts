import { Component, Input, OnInit } from '@angular/core';
import { Ad } from 'src/app/models/ad';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.css']
})
export class AdCardComponent implements OnInit {

  @Input() ad:Ad;
  constructor() { }

  ngOnInit(): void {
  }

  addToFavorite(){
    console.log("Userul curent a adaugat la favorite anuntul "+this.ad.id);
  }
}
