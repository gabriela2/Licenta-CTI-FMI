import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Category } from 'src/app/models/category';
import { DeliveryType } from 'src/app/models/deliveryType';
import { UnitOfMeasure } from 'src/app/models/unitOfMeasure';
import { AdminService } from 'src/app/services/admin.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { DeliveryTypesService } from 'src/app/services/delivery-types.service';
import { UnitsOfMeasureService } from 'src/app/services/units-of-measure.service';
import { EditCategoriesModalComponent } from '../edit-categories-modal/edit-categories-modal.component';
import { EditDeliveryTypeModalComponent } from '../edit-delivery-type-modal/edit-delivery-type-modal.component';
import { EditUnitofmeasureModalComponent } from '../edit-unitofmeasure-modal/edit-unitofmeasure-modal.component';

@Component({
  selector: 'app-reference-table-administration',
  templateUrl: './reference-table-administration.component.html',
  styleUrls: ['./reference-table-administration.component.css']
})
export class ReferenceTableAdministrationComponent implements OnInit {

  categories:Category[];
  deliveryTypes:DeliveryType[];
  unitsOfMeasure:UnitOfMeasure[];
  bsModalRef: BsModalRef;

  constructor(
    private adminService:AdminService,
    private categoryService:CategoriesService,
    private deliveryTypeService:DeliveryTypesService, 
    private unitOfMeasureTypeService:UnitsOfMeasureService,
    private modalService:BsModalService) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadDelieryTypes();
    this.loadUnitsOfMeasure();
  }

  loadCategories(){
    this.categoryService.getCategories().subscribe(response=>{
      this.categories=response;
    })
  }
  loadDelieryTypes(){
    this.deliveryTypeService.getDeliveryTypes().subscribe(response=>{
      this.deliveryTypes=response;
    })
  }
  loadUnitsOfMeasure(){
    this.unitOfMeasureTypeService.getUnitsOfMeasure().subscribe(response=>{
      this.unitsOfMeasure=response;
    })
  }
  deleteCategory(category:Category){
    this.adminService.deleteCategory(category.id).subscribe();
    window.location.reload();
  }
  editCaregory(category:Category){
    const configurationForModal = {
      class: 'modal-dialog-centered',
      initialState: {
        category
      }
    }
    this.bsModalRef = this.modalService.show(EditCategoriesModalComponent, configurationForModal);

  }

  deleteUnitOfMeasure(unitOfMeasure:UnitOfMeasure){
    this.adminService.deleteUnitOfMeasure(unitOfMeasure.id).subscribe();
    window.location.reload();
  }
  editUnitOfMeasure(unitOfMeasure:UnitOfMeasure){
    const configurationForModal = {
      class: 'modal-dialog-centered',
      initialState: {
        unitOfMeasure
      }
    }
    this.bsModalRef = this.modalService.show(EditUnitofmeasureModalComponent, configurationForModal);

  }




  deleteDeliveryType(deliveryType:DeliveryType){
    this.adminService.deleteDeliveryType(deliveryType.id).subscribe();
    window.location.reload();
  }
  editDeliveryType(deliveryType:DeliveryType){
    const configurationForModal = {
      class: 'modal-dialog-centered',
      initialState: {
        deliveryType
      }
    }
    this.bsModalRef = this.modalService.show(EditDeliveryTypeModalComponent, configurationForModal);

  }


}
