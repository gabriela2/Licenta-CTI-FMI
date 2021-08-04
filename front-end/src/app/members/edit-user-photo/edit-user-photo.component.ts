import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import {FileUploader} from 'ng2-file-upload';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators';
import { MembersService } from 'src/app/services/members.service';
import Member from 'src/app/models/member';
import { UserPhoto } from 'src/app/models/userPhoto';
import { Photo } from 'src/app/models/photo';

@Component({
  selector: 'app-edit-user-photo',
  templateUrl: './edit-user-photo.component.html',
  styleUrls: ['./edit-user-photo.component.css']
})
export class EditUserPhotoComponent implements OnInit {

  @Input() member:Member;
  
  uploader:FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  user:User;

  constructor(private authService:AuthService,private memberService: MembersService) {
    this.authService.currentUser$.pipe(take(1)).subscribe(user=> this.user=user);
   }

  ngOnInit(): void {
    this.initUploader();
  }

  fileOverBase(e:any){
    this.hasBaseDropZoneOver = e;
  }

  

  initUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: true,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo: Photo = JSON.parse(response);
        this.member.photo=photo;
        console.log(this.member);
        this.user.photoUrl = photo.url;
           this.member.photoUrl = photo.url;
           this.authService.setCurrentUser(this.user);
        
      }
    }
  }

  deletePhoto(){
    this.memberService.deletePhoto().subscribe();
    this.member.photoUrl = null;
    this.member.photo=null;
    this.user.photoUrl=null;
    this.authService.setCurrentUser(this.user);
    
  }


}
