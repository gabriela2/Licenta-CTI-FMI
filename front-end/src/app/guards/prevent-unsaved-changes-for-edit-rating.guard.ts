import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EditRatingComponent } from '../ratings/edit-rating/edit-rating.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesForEditRatingGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: EditRatingComponent): boolean  {
      const canDeactivate = component.canDeactivate();
    if(component.editRating.dirty || !canDeactivate){
       return confirm('Continui? Modificarile facute vor fi pierdute');

    }
    else{
    return true;
  }}
  
}
