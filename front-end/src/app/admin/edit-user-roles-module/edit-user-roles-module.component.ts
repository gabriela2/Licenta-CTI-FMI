import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-user-roles-module',
  templateUrl: './edit-user-roles-module.component.html',
  styleUrls: ['./edit-user-roles-module.component.css']
})
export class EditUserRolesModuleComponent implements OnInit {

  user:any;
  allRoles: any[]; 
  userRoles:any;

  constructor(public bsModalRef: BsModalRef, private adminService:AdminService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getRolesArray();

  }

  updateRoles() {
    const finalRoles = {
      roles: this.allRoles.filter(role => role.checked === true).map(role => role.name)
    };
    if(finalRoles.roles.length!==0){
    this.adminService.editUserRoles(this.user.id, finalRoles.roles).subscribe();
    this.bsModalRef.hide();
    window.location.reload();
    }
    else{
      this.toastr.error("Fiecare user trebuie sa aiba cel putin un rol");
    }
  }


  getRolesArray() {
     this.allRoles = [
      {name: 'Admin', checked:false},
      {name: 'Moderator',checked:false},
      {name: 'Member',checked:false}
    ];
    this.userRoles=this.user.roles;
    console.log(this.userRoles);
    for (var item of this.allRoles){
      for (var item2 of this.userRoles){
        if(item2==item.name){
          item.checked=true;
        }
      }
    }

  }

}
