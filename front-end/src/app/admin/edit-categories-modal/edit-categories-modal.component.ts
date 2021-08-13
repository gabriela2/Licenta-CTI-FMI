import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-categories-modal',
  templateUrl: './edit-categories-modal.component.html',
  styleUrls: ['./edit-categories-modal.component.css']
})
export class EditCategoriesModalComponent implements OnInit {

  category:Category;
  
  constructor(public bsModalRef: BsModalRef, private adminService:AdminService, private toastr:ToastrService) { }

  ngOnInit(): void {
    console.log(this.category);
  }

  updateCategory() {
    this.adminService.putCategory(this.category.id, this.category).subscribe();
    this.bsModalRef.hide();
   
  }
}
