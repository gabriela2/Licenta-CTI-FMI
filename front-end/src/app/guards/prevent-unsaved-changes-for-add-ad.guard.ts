import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AddAdComponent } from '../ads/add-ad/add-ad.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesForAddAdGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: AddAdComponent): Observable<boolean> | boolean  {
    if(component.addAdForm.dirty || component.flag===false||component.flag2===false||component.flag3===false){
      return confirm('Esti sigur ca vrei sa continui?');
    }
    return true;
  }
  
}
