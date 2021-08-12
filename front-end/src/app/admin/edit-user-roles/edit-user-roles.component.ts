import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';
import { EditUserRolesModuleComponent } from '../edit-user-roles-module/edit-user-roles-module.component';

@Component({
  selector: 'app-edit-user-roles',
  templateUrl: './edit-user-roles.component.html',
  styleUrls: ['./edit-user-roles.component.css']
})
export class EditUserRolesComponent implements OnInit {

  users:Partial<User[]>;
  bsModalRef: BsModalRef;
  constructor(private adminService:AdminService, private modalService:BsModalService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.adminService.getRolesForUsers().subscribe(response=>{
      this.users=response;
      console.log(this.users);
    })
  }

  edit(user: User) {
    const configurationForModal = {
      class: 'modal-dialog-centered',
      initialState: {
        user,
      }
    }
    this.bsModalRef = this.modalService.show(EditUserRolesModuleComponent, configurationForModal);
  }

  

}
