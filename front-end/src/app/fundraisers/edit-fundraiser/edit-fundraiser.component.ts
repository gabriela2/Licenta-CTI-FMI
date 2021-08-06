import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Fundraiser } from 'src/app/models/fundraiser';
import { FundraisersService } from 'src/app/services/fundraisers.service';

@Component({
  selector: 'app-edit-fundraiser',
  templateUrl: './edit-fundraiser.component.html',
  styleUrls: ['./edit-fundraiser.component.css']
})
export class EditFundraiserComponent implements OnInit {

  fundraiser: Fundraiser;
  fundraiserId: number;
  @HostListener("window:beforeunload", ["$event"])
  beforeUnloadHandler(event: any) {
    if (this.editFundraiserForm.dirty) {
      event.returnValue = true;
    }
  }

  @ViewChild('editFundraiserForm') editFundraiserForm: NgForm;
  constructor(
    private fundraiserService:FundraisersService,
    private toastr:ToastrService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loadFundraiser()
  }
  loadFundraiser(){
    this.route.params.subscribe((params) => {
      this.fundraiserId = params['id'];
    })
    this.fundraiserService.getFundraiser(this.fundraiserId).subscribe(response=>{
      this.fundraiser = response;
    })

  }

  updateFundraiser() {
    this.fundraiser.isValidated=false;
    this.fundraiser.isRejected = false;
    this.fundraiserService.put(this.fundraiser.id, this.fundraiser).subscribe();
    this.toastr.success('Strangerea de fonduri a fost actualizata cu success!');
    this.editFundraiserForm.reset(this.fundraiser)
  }

}
