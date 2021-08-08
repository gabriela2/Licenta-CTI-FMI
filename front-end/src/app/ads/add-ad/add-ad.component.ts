import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ad } from 'src/app/models/ad';
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
  selector: 'app-add-ad',
  templateUrl: './add-ad.component.html',
  styleUrls: ['./add-ad.component.css']
})
export class AddAdComponent implements OnInit {

  addAdForm: FormGroup;
  categoriesName: Category[];
  unitsOfMeasure: UnitOfMeasure[];
  categoryId: number;
  unitOfMeasureId: number;
  adId:number;
  flag=false;
  flag2=false;
  flag3=false;
  deliveryTypes:DeliveryType[];
  list: HelperDelivery[] = [];
  ad:Ad;

  constructor(
    private formBuilder: FormBuilder,
    private adService: AdsService,
    private router: Router,
    private categoryService: CategoriesService,
    private unitOfMeasureService: UnitsOfMeasureService,
    private deliveryTypeService: DeliveryTypesService,
    private toastr: ToastrService,
    private adDeliveryService: AdsDeliveryTypesService,
  ) { }

  @HostListener("window:beforeunload", ["$event"])
  beforeUnloadHandler(event: any) {
    if (this.addAdForm.dirty || this.flag===false||this.flag2===false||this.flag3===false) {
      event.returnValue = true;
    }
  }

  ngOnInit(): void {
    this.addAdForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      quantity: [1, [Validators.required, Validators.min(1), Validators.max(999999999999)]],
      existsLimit: ['nu'],
      limit: [1, [Validators.required, Validators.min(1)]],
      unitOfMeasure: ['', Validators.required],
      category: ['', Validators.required],
    });
    this.loadCategories();
    this.loadUnitsOfMeasure();
    this.loadDeliveryType();
  }

  get NoOfSelectedDeliveryType() {
    return this.list.filter(x => x.checked);
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

  addAd() {
    console.log(this.addAdForm.value);
    for (const item of this.categoriesName) {
      if (item.name == this.addAdForm.get('category').value) {
        this.categoryId = item.id;
      }
    }

    for (const item of this.unitsOfMeasure) {
      if (item.abbreviation == this.addAdForm.get('unitOfMeasure').value) {
        this.unitOfMeasureId = item.id;
      }
      
    }

    let ad ={
      name : this.addAdForm.get('name').value,
      description : this.addAdForm.get('description').value,
      createdAt:new Date(),
      quantity: this.addAdForm.get('quantity').value,
      existsLimit: this.addAdForm.get('existsLimit').value ==='da'?true:false,
      limit: this.addAdForm.get('existsLimit').value==='da'? this.addAdForm.get('limit').value: null,
      userId: parseInt(localStorage.getItem('userId')),
      categoryId : this.categoryId,
      unitOfMeasureId: this.unitOfMeasureId

    }
    this.adService.post(ad).subscribe(response=>{
      this.adId = parseInt(response.toString());
      this.adService.getAd(this.adId).subscribe(response=>{
        this.ad=response;
      });
      this.toastr.success('Anuntul a fost adaugat cu succes');
      this.flag=true;
    });
  


  }


  viewAd(){
    this.router.navigateByUrl('/ads-list/'+this.adId);
  }

  cancel() {
    this.router.navigateByUrl('/my-ads');
   }

   loadDeliveryType() {
    this.deliveryTypeService.getDeliveryTypes().subscribe(response => {
      this.deliveryTypes = response;
      for (const del of this.deliveryTypes) {
        var obj = { id: del.id, name: del.name, checked: false };
        this.list.push(obj);
      }
      console.log("this.list", this.list)

    })
  }



  saveDeliveryTypes() {
    console.log(this.list.filter(x => x.checked));
      for(const item2 of this.list.filter(x => x.checked)){
          var objectToAdd={
            id:0,
            deliveryTypeId:item2.id,
            deliveryType:item2.name,
            adId:this.adId
          };
          this.adDeliveryService.post(objectToAdd).subscribe();
        }
      

      this.toastr.success('Modalitatile de livrare au fost actualizate cu success!');
      this.flag2=true;
      this.flag3=true;
     
    }

}
