import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model:any={};
  

  constructor(private authService:AuthService, private router:Router, private toastrService:ToastrService) { }

  ngOnInit(): void {
  }
  register(){
    this.authService.register(this.model).subscribe(response=>{
      console.log(response);
      this.router.navigateByUrl('/login');

    }, error=>{
      console.log(error);
      this.toastrService.error(error.error);
    })
  }
  cancel(){
    this.router.navigateByUrl('/login');
    
  }

  

}
