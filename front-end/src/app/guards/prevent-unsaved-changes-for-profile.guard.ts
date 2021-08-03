import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesForProfileGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: MemberEditComponent):boolean  {
    if(component.editMemberForm.dirty ||
      component.editAddressForm.dirty || 
      component.editBankDetailsForm.dirty ||
      component.editStripeDetailsForm.dirty){
      return confirm('Continui? Modificarile facute vor fi pierdute');
    }
    else{
      return true;
    }
  }
  
}
