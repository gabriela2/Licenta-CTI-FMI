import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EditFundraiserComponent } from '../fundraisers/edit-fundraiser/edit-fundraiser.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesForEditFundraiserGuard implements CanDeactivate<unknown> {
  canDeactivate(component: EditFundraiserComponent): boolean{
    if(component.editFundraiserForm.dirty){
      return confirm("Toate modificarile vor fi pierdute.Continui?")
    }
    return true;
  }
  
}
