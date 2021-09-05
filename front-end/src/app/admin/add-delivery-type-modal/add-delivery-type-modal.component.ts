import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-delivery-type-modal',
  templateUrl: './add-delivery-type-modal.component.html',
  styleUrls: ['./add-delivery-type-modal.component.css']
})
export class AddDeliveryTypeModalComponent implements OnInit {

  addDeliveryTypeForm: FormGroup;
  constructor(
    public bsModalRef: BsModalRef, 
    private adminService:AdminService, 
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.addDeliveryTypeForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price:[0,[Validators.required, Validators.min(0)]]
    });
  }
  addDeliveryType(){
    let deliveryType={
      id:0,
      name:this.addDeliveryTypeForm.get('name').value,
      description:this.addDeliveryTypeForm.get('description').value,
      price:this.addDeliveryTypeForm.get('price').value
    };
    this.adminService.postDeliveryType(deliveryType).subscribe();
    this.bsModalRef.hide();
    window.location.reload();
  }

}
