import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EditAdComponent } from '../ads/edit-ad/edit-ad.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesForEditAdGuard implements CanDeactivate<unknown> {
  canDeactivate(component: EditAdComponent): boolean{
    if(component.editAdForm.dirty){
      return confirm("Toate modificarile vor fi pierdute.Continui?")
    }
    return true;
  }
  
}
