import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import Member from '../models/member';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {

  userId:number;
  user:User;
  isLogged:boolean;

  constructor(private router:Router, private route:ActivatedRoute, private authService:AuthService, ) { 
    this.authService.currentUser$.pipe(take(1)).subscribe(response=>{
      this.user=response;
      console.log(this.user);
    })
  }

  ngOnInit(): void {
    
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      this.authService.activateAccount(this.userId).subscribe(response=>{
        console.log(response);
      })
      
    })
  }

  changePage(){
    this.router.navigateByUrl('/login');
  }

}
