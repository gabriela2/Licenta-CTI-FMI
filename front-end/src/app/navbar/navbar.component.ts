import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Member from '../models/member';
import { AuthService } from '../services/auth.service';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  member:Member;
  constructor(public authService:AuthService,private router: Router, private memberService:MembersService) { }

  ngOnInit(): void {
    if(parseInt(localStorage.getItem('userId'))){
    this.memberService.getMember(parseInt(localStorage.getItem('userId'))).subscribe(response=>{
      this.member=response;
    })
  }
    
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/');
    
  }

}
