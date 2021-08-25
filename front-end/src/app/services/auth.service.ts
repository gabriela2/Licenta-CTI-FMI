import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HelperRegister } from '../models/HelperRegister';
import Member from '../models/member';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  activateAccount(id:number){
    return this.http.put(this.baseUrl+'auth/activate-account/'+id, {});
  }



  login(model: any) {
    return this.http.post(this.baseUrl + 'auth/login', model).pipe(
      map((response:User)=>{
        const user = response;
        if(user){
          this.setCurrentUser(user);
        }
      })
    );
    
  }

  setCurrentUser(user:User){
    this.currentUserSource.next(user);
    localStorage.setItem('user',JSON.stringify(user));
          console.log(user);
          const userId = this.getDecodedToken(user.token).nameid;
          localStorage.setItem('userId', userId);
          user.roles = [];
          const roles = this.getDecodedToken(user.token).role;
          Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
  }

  register(model:HelperRegister){
    return this.http.post(this.baseUrl+'auth/register', model);
  }


  logout(){
    localStorage.removeItem('user');
    localStorage.removeItem('userId')
    this.currentUserSource.next(null);
  }

  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
