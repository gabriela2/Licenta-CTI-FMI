import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-unitofmeasure-modal',
  templateUrl: './add-unitofmeasure-modal.component.html',
  styleUrls: ['./add-unitofmeasure-modal.component.css']
})
export class AddUnitofmeasureModalComponent implements OnInit {

  addUnitOfMeasureForm: FormGroup;
  constructor(public bsModalRef: BsModalRef, private adminService:AdminService, private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.addUnitOfMeasureForm = this.formBuilder.group({
      name: ['', Validators.required],
      abbreviation:['', Validators.required],
      description: ['', Validators.required],
    });
  }
  addUnitOfMeasure(){
    let unitOfMeasure={
      id:0,
      name:this.addUnitOfMeasureForm.get('name').value,
      description:this.addUnitOfMeasureForm.get('description').value,
      abbreviation:this.addUnitOfMeasureForm.get('abbreviation').value
    };
    this.adminService.postUnitOfMeasure(unitOfMeasure).subscribe();
    this.bsModalRef.hide();
    window.location.reload();
  }

}
