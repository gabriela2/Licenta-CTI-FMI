import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-category-modal',
  templateUrl: './add-category-modal.component.html',
  styleUrls: ['./add-category-modal.component.css']
})
export class AddCategoryModalComponent implements OnInit {

  addCategoryForm: FormGroup;
  constructor(
    public bsModalRef: BsModalRef, 
    private adminService:AdminService, 
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.addCategoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  addCategory(){
    let category={
      id:0,
      name:this.addCategoryForm.get('name').value,
      description:this.addCategoryForm.get('description').value,
    }
    this.adminService.postCategory(category).subscribe();
    this.bsModalRef.hide();
    window.location.reload();
  }


}
