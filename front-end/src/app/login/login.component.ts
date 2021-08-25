import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any={};
  constructor(private authService:AuthService,private router: Router, private toatrService:ToastrService) { }

  ngOnInit(): void {
  }

  login(){
    this.authService.login(this.model).subscribe(response =>{
      console.log(response);
      this.router.navigateByUrl('/ads-list');
    }, error=>{
      console.log(error);
      this.toatrService.error("Credentialele nu sunt corecte! Te rugam sa incerci din nou. ");
    })
  }

}
