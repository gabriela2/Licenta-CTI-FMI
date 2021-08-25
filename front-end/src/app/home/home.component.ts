import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { DeliveryType } from '../models/deliveryType';
import { UnitOfMeasure } from '../models/unitOfMeasure';
import { CategoriesService } from '../services/categories.service';
import { DeliveryTypesService } from '../services/delivery-types.service';
import { UnitsOfMeasureService } from '../services/units-of-measure.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  deliveryTypes:DeliveryType[];
  categories:Category[];
  unitsOfMeasure:UnitOfMeasure[];
  constructor(
    private deliveryTypeService:DeliveryTypesService,
    private categoryService:CategoriesService,
    private unitsOfMeasureService:UnitsOfMeasureService) { }

  ngOnInit(): void {
    this.deliveryTypeService.getDeliveryTypes().subscribe(response=>{
      this.deliveryTypes= response;
    });
    this.categoryService.getCategories().subscribe(response=>{
      this.categories=response;
    });
    this.unitsOfMeasureService.getUnitsOfMeasure().subscribe(response=>{
      this.unitsOfMeasure=response;
    })
   
  }

}
