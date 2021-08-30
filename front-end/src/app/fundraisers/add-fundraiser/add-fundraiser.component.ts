import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Fundraiser } from 'src/app/models/fundraiser';
import Member from 'src/app/models/member';
import { FundraisersService } from 'src/app/services/fundraisers.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-add-fundraiser',
  templateUrl: './add-fundraiser.component.html',
  styleUrls: ['./add-fundraiser.component.css']
})
export class AddFundraiserComponent implements OnInit {

  addFundraiserForm: FormGroup;
  fundraiserId:number;
  flag=false;
  flag2=false;
  fundraiser:Fundraiser;
  currentUserLogged :number;
  member: Member;


  constructor(
    private memberService:MembersService,
    private fundraiserService:FundraisersService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  @HostListener("window:beforeunload", ["$event"])
  beforeUnloadHandler(event: any) {
    if (this.addFundraiserForm.dirty || this.flag===false||this.flag2===false) {
      event.returnValue = true;
    }
  }

 

  ngOnInit(): void {
    this.addFundraiserForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10000)]],
      targetAmount: [1, [Validators.required, Validators.min(1), Validators.max(999999999999999999999)]],
    });

    this.currentUserLogged = parseInt(localStorage.getItem('userId'));
    this.loadMember();
  }

  addFundraiser(){
    let fundraiser ={
      name : this.addFundraiserForm.get('name').value,
      description : this.addFundraiserForm.get('description').value,
      createdAt:new Date(),
      targetAmount: this.addFundraiserForm.get('targetAmount').value,
      currentAmount:0,
      isValidated:false,
      isRejected:false,
      userId:this.currentUserLogged
    }
    this.fundraiserService.post(fundraiser).subscribe(response=>{
      this.fundraiserId = parseInt(response.toString());
      this.fundraiserService.getFundraiser(this.fundraiserId).subscribe(response=>{
        this.fundraiser=response;
      });
      this.toastr.info('Strangerea de fonduri a fost adaugata cu succes');
      this.flag=true;
    });
  }

  loadMember(){
    this.memberService.getMember(this.currentUserLogged).subscribe(response=>{
      this.member=response;
    })
  }
  
  viewFundraiser(){
    this.router.navigateByUrl('/fundraisers-list/'+this.fundraiserId);
  }

  cancel() {
    this.router.navigateByUrl('/my-fundraisers');
   }

}
