import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs/operators';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Directive ({
  selector: '[appUserRole]'
})
export class UserRoleDirective implements OnInit{
  @Input() appUserRole:string[];
  user:User;
  constructor(private viewContainerRef: ViewContainerRef, private templateRef:TemplateRef<any>, private authService: AuthService ) {
    this.authService.currentUser$.pipe(take(1)).subscribe(response=>{
      this.user=response;
    })
   }
   ngOnInit():void{
     if(!this.user?.roles|| this.user==null){
       this.viewContainerRef.clear();
       return;
     }
     if(this.user?.roles.some(r=>this.appUserRole.includes(r))){
       this.viewContainerRef.createEmbeddedView(this.templateRef);
     }else{
       this.viewContainerRef.clear();
     }
   }

}
