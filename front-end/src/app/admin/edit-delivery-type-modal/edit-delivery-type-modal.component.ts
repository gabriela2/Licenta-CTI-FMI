import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { DeliveryType } from 'src/app/models/deliveryType';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-delivery-type-modal',
  templateUrl: './edit-delivery-type-modal.component.html',
  styleUrls: ['./edit-delivery-type-modal.component.css']
})
export class EditDeliveryTypeModalComponent implements OnInit {

  deliveryType:DeliveryType;
  constructor(
    public bsModalRef: BsModalRef, 
    private adminService:AdminService, 
    private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  updateDeliveryType(){
    this.adminService.putDeliveryType(this.deliveryType.id, this.deliveryType).subscribe();
    this.toastr.info("Metoda de livrare a fost actualizata");
    this.bsModalRef.hide();
  }



}
