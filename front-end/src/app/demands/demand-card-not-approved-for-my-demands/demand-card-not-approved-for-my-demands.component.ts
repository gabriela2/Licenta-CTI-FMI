import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Ad } from 'src/app/models/ad';
import { Demand } from 'src/app/models/demand';
import { AdsService } from 'src/app/services/ads.service';
import { DemandsService } from 'src/app/services/demands.service';
import { EditDemandComponent } from '../edit-demand/edit-demand.component';

@Component({
  selector: 'app-demand-card-not-approved-for-my-demands',
  templateUrl: './demand-card-not-approved-for-my-demands.component.html',
  styleUrls: ['./demand-card-not-approved-for-my-demands.component.css']
})
export class DemandCardNotApprovedForMyDemandsComponent implements OnInit {

  @Input() demand:Demand;
  ad:Ad;
  bsModalRef: BsModalRef;
  constructor(private adService:AdsService, private demandService:DemandsService, private toastr:ToastrService, private modalService:BsModalService) { }

  ngOnInit(): void {
    this.getAd();
  }
  getAd(){
    this.adService.getAd(this.demand.adId).subscribe(response=>{
      this.ad=response;
    })
  }

  editDemand(demand:Demand){
    const configurationForModal = {
      class: 'modal-dialog-centered',
      initialState:{
        demand
      }
      
    }
    this.bsModalRef = this.modalService.show(EditDemandComponent,configurationForModal);

  }
  deleteDemand(){
    this.ad.quantity += this.demand.quantityRequested;
    if(this.ad.isActive===false){
      this.ad.isActive=true;
    }
    this.adService.put(this.ad.id, this.ad).subscribe();
    this.demandService.delete(this.demand.id).subscribe();
    this.toastr.info("Cererea a fost stearsa");
    window.location.reload();
    

  }
}
