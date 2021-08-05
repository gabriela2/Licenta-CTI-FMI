import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ad } from 'src/app/models/ad';
import { Ad_x_DeliveryType } from 'src/app/models/ad_x_deliveryType';
import { Category } from 'src/app/models/category';
import { DeliveryType } from 'src/app/models/deliveryType';
import { UnitOfMeasure } from 'src/app/models/unitOfMeasure';
import { AdsService } from 'src/app/services/ads.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { DeliveryTypesService } from 'src/app/services/delivery-types.service';
import { UnitsOfMeasureService } from 'src/app/services/units-of-measure.service';

@Component({
  selector: 'app-edit-ad',
  templateUrl: './edit-ad.component.html',
  styleUrls: ['./edit-ad.component.css']
})
export class EditAdComponent implements OnInit {

  ad:Ad;
  adId:number;
  categoriesName:Category[];
  unitsOfMeasure:UnitOfMeasure[];
  deliveryTypes: DeliveryType[];
  categoryId:number;
  unitOfMeasureId:number;
  selectedTypes:Ad_x_DeliveryType[];

  @ViewChild('editAdForm') editAdForm: NgForm;

  constructor(
    private adService: AdsService,
    private route: ActivatedRoute,
    private categoryService:CategoriesService,
    private unitOfMeasureService:UnitsOfMeasureService,
    private deliveryTypeService:DeliveryTypesService,
    private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
    this.loadAd();
    this.loadCategories();
    this.loadUnitsOfMeasure();
    this.loadDeliveryType();
  }

  loadAd(){
    this.route.params.subscribe((params) => {
      this.adId = params['id'];
    })
    console.log("this.adId = ", this.adId);
    this.adService.getAd(this.adId).subscribe(response=>{
      this.ad=response;
      this.selectedTypes = this.ad.ad_x_DeliveryType;

      console.log('this.selectedTypes', this.selectedTypes);

      console.log(this.ad);
    })
  }

  updateAd(){
    if(this.ad.existsLimit===false){
      this.ad.limit=null;
    }
    for(const item of this.categoriesName){
      if(item.name==this.ad.category){
        this.categoryId=item.id;
      }
    }
    console.log(this.categoryId);
    console.log(this.ad);
    this.ad.categoryId=this.categoryId;
    for(const item of this.unitsOfMeasure){
      if(item.abbreviation==this.ad.unitOfMeasure){
        this.unitOfMeasureId=item.id;
      }
    }
    this.ad.unitOfMeasureId=this.unitOfMeasureId;
    this.adService.put(this.ad.id,this.ad).subscribe();
    this.toastr.success('Anuntul a fost actualizat cu success!');
    this.editAdForm.reset(this.ad)
  }

  loadCategories(){
    this.categoryService.getCategories().subscribe(response=>{
      this.categoriesName=response;
      console.log(this.categoriesName);
    })
  }

  loadUnitsOfMeasure(){
    this.unitOfMeasureService.getUnitsOfMeasure().subscribe(response=>{
      this.unitsOfMeasure = response;
      console.log(this.unitsOfMeasure)
    })
  }

  loadDeliveryType(){
    this.deliveryTypeService.getDeliveryTypes().subscribe(response=>{
      this.deliveryTypes = response;
      console.log(this.deliveryTypes);
    })
  }
}
