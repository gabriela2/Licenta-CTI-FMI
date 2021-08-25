import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AddFundraiserComponent } from '../fundraisers/add-fundraiser/add-fundraiser.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesForAddFundraiserGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: AddFundraiserComponent): Observable<boolean> | boolean  {
    if(component.addFundraiserForm.dirty || component.flag===false){
      return confirm('Esti sigur ca vrei sa continui?');
    }
    return true;
  }
  }
  

