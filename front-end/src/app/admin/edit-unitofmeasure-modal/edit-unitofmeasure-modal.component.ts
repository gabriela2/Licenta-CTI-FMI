import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { UnitOfMeasure } from 'src/app/models/unitOfMeasure';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-unitofmeasure-modal',
  templateUrl: './edit-unitofmeasure-modal.component.html',
  styleUrls: ['./edit-unitofmeasure-modal.component.css']
})
export class EditUnitofmeasureModalComponent implements OnInit {

  unitOfMeasure:UnitOfMeasure;
  constructor(public bsModalRef: BsModalRef, private adminService:AdminService, private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  updateUnitOfMeasure(){
    console.log(this.unitOfMeasure);
    this.adminService.putUnitOfMeasure(this.unitOfMeasure.id, this.unitOfMeasure).subscribe();
    this.toastr.info("Unitatea de masura a fost actualizata");
    this.bsModalRef.hide();
  }

}
