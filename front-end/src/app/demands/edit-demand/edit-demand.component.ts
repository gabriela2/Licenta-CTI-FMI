import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Ad } from 'src/app/models/ad';
import { Demand } from 'src/app/models/demand';
import { AdsService } from 'src/app/services/ads.service';
import { DemandsService } from 'src/app/services/demands.service';

@Component({
  selector: 'app-edit-demand',
  templateUrl: './edit-demand.component.html',
  styleUrls: ['./edit-demand.component.css']
})
export class EditDemandComponent implements OnInit {

  demand: Demand;
  ad: Ad;
  constructor(public bsModalRef: BsModalRef, private demandService: DemandsService, private toastrService: ToastrService, private adService: AdsService) { }

  ngOnInit(): void {
    this.loadAd();
  }

  loadAd() {
    this.adService.getAd(this.demand.adId).subscribe(response => {
      this.ad = response;
    })
  }
  updateDemand() {

    this.demandService.put(this.demand.id, this.demand).subscribe();
    this.toastrService.info("Cererea a fost modificata cu success!")
    this.bsModalRef.hide();
  }

}
