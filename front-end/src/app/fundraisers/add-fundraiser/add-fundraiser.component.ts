import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Member from 'src/app/models/member';
import { FundraisersService } from 'src/app/services/fundraisers.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-add-fundraiser',
  templateUrl: './add-fundraiser.component.html',
  styleUrls: ['./add-fundraiser.component.css']
})
export class AddFundraiserComponent implements OnInit {

  constructor(
    private memberService:MembersService,
    private fundraiserService:FundraisersService,
    private toastr:ToastrService
  ) { }

  currentUserLogged :number;
  member: Member;

  ngOnInit(): void {
    this.currentUserLogged = parseInt(localStorage.getItem('userId'));
    this.loadMember();
  }

  loadMember(){
    this.memberService.getMember(this.currentUserLogged).subscribe(response=>{
      this.member=response;
    })
  }
  addFundraiser(form){
    

    var fundraiser={
      id:0,
    name: form.name,
    description: form.description,
    createdAt: new Date(),
    currentAmount: 0,
    targetAmount: form.targetAmount,
    isValidated: false,
    isRejected:false,
    url: null,
    userId: this.currentUserLogged,
    photos:null
    }
    this.fundraiserService.post(fundraiser).subscribe(()=>{
      this.toastr.success("Ati adaugat o noua strangere de fonduri.");
      
    })
  }

}
