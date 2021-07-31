import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }



  login(model: any) {
    return this.http.post(this.baseUrl + 'auth/login', model).pipe(
      map((response:User)=>{
        const user = response;
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          console.log(user);
          this.currentUserSource.next(user);
          const userId = this.getDecodedToken(user.token).nameid;
          localStorage.setItem('userId', userId);
        }
      })
    );
    
  }

  register(model:any){
    return this.http.post(this.baseUrl+'auth/register', model);
  }

  setCurrentUser(user:User){
    this.currentUserSource.next(user);

  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
