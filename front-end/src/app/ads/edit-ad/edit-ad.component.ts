import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ad } from 'src/app/models/ad';
import { Ad_x_DeliveryType } from 'src/app/models/ad_x_deliveryType';
import { Category } from 'src/app/models/category';
import { DeliveryType } from 'src/app/models/deliveryType';
import { HelperDelivery } from 'src/app/models/HelperDelivery';
import { UnitOfMeasure } from 'src/app/models/unitOfMeasure';
import { AdsDeliveryTypesService } from 'src/app/services/ads-delivery-types.service';
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

  ad: Ad;
  adId: number;
  categoriesName: Category[];
  unitsOfMeasure: UnitOfMeasure[];
  deliveryTypes: DeliveryType[];
  categoryId: number;
  unitOfMeasureId: number;
  ad_x_DeliveryType: Ad_x_DeliveryType[] = [];
  list: HelperDelivery[] = [];
  InitialList: HelperDelivery[] = [];
  objectToAd:Ad_x_DeliveryType;


  @ViewChild('editAdForm') editAdForm: NgForm;

  constructor(
    private adService: AdsService,
    private route: ActivatedRoute,
    private categoryService: CategoriesService,
    private unitOfMeasureService: UnitsOfMeasureService,
    private deliveryTypeService: DeliveryTypesService,
    private toastr: ToastrService,
    private adDeliveryService:AdsDeliveryTypesService,
    private router:Router

  ) { }



  ngOnInit(): void {
    this.loadAd();
    this.loadCategories();
    this.loadUnitsOfMeasure();
  }


  @HostListener("window:beforeunload", ["$event"])
  beforeUnloadHandler(event: any) {
    if (this.editAdForm.dirty) {
      event.returnValue = true;
    }
  }

  viewAd(){
    this.router.navigateByUrl('/ads-list/'+this.adId);
  }

  loadAd() {
    this.route.params.subscribe((params) => {
      this.adId = params['id'];
    })
    this.adService.getAd(this.adId).subscribe(response => {
      this.ad = response;
      this.ad_x_DeliveryType = this.ad.ad_x_DeliveryType;

      for(const item of this.ad_x_DeliveryType){
        var obj = { id: item.deliveryTypeId, name: item.deliveryType, checked: true };
        this.InitialList.push(obj);
      }
      console.log("InitialList", this.InitialList);
      this.loadDeliveryType();
    })
  }

  updateAd() {
    if (this.ad.existsLimit === false) {
      this.ad.limit = null;
    }
    for (const item of this.categoriesName) {
      if (item.name == this.ad.category) {
        this.categoryId = item.id;
      }
    }
    this.ad.categoryId = this.categoryId;
    for (const item of this.unitsOfMeasure) {
      if (item.abbreviation == this.ad.unitOfMeasure) {
        this.unitOfMeasureId = item.id;
      }
    }
    this.ad.unitOfMeasureId = this.unitOfMeasureId;
    this.ad.isRejected=false;
    this.ad.isValidated=false;
    this.adService.put(this.ad.id, this.ad).subscribe();
    this.toastr.info('Anuntul a fost actualizat cu success!');
    this.editAdForm.reset(this.ad)
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(response => {
      this.categoriesName = response;
    })
  }

  loadUnitsOfMeasure() {
    this.unitOfMeasureService.getUnitsOfMeasure().subscribe(response => {
      this.unitsOfMeasure = response;
    })
  }

  loadDeliveryType() {
    this.deliveryTypeService.getDeliveryTypes().subscribe(response => {
      this.deliveryTypes = response;
      for (const del of this.deliveryTypes) {
        for (const delad of this.ad_x_DeliveryType) {
          if (del.name == delad.deliveryType) {
            var obj = { id: del.id, name: del.name, checked: true };
            this.list.push(obj);
          }
        }
      }
      for (const variabila of this.deliveryTypes) {
        if (!this.list.find(e => e.name === variabila.name)) {
          var obj = { id: variabila.id, name: variabila.name, checked: false };
          this.list.push(obj);
        }
      }
      console.log("this.list", this.list)

    })
  }



  get NoOfSelectedDeliveryType() {
    return this.list.filter(x => x.checked);
  }
  

  saveDeliveryTypes() {
    console.log(this.list.filter(x => x.checked));
      for(const item2 of this.list.filter(x => x.checked)){
        if (!this.ad_x_DeliveryType.find(e => e.deliveryTypeId === item2.id)) {
          // console.log(item2,"nu era pana acum");
          var objectToAdd={
            id:0,
            deliveryTypeId:item2.id,
            deliveryType:item2.name,
            adId:this.adId
          };
          this.adDeliveryService.post(objectToAdd).subscribe();
        }
      }

      for(const item of this.ad_x_DeliveryType){
        if (!this.list.filter(x => x.checked).find(e => e.id === item.deliveryTypeId)) {
          // console.log(item,"a fost si nu mai este");
          this.adDeliveryService.delete(item.id).subscribe();
        }
      }

      this.toastr.info('Anuntul a fost actualizat cu success!');
      window.location.reload();
     
    }


  }

