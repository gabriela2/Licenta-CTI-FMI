import { Injectable } from '@angular/core';
import { CanDeactivate,} from '@angular/router';
import { EditRatingComponent } from '../ratings/edit-rating/edit-rating.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesForEditRatingGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: EditRatingComponent): boolean  {
    if(component.editRating.dirty){
       return confirm('Renunti la modificarea acestui review?');
    }
    else{
    return true;
  }}
  
}
