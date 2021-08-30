import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs/operators';
import { Fundraiser } from 'src/app/models/fundraiser';
import { Photo } from 'src/app/models/photo';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { FundraisersService } from 'src/app/services/fundraisers.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-photo-fundraisers',
  templateUrl: './edit-photo-fundraisers.component.html',
  styleUrls: ['./edit-photo-fundraisers.component.css']
})
export class EditPhotoFundraisersComponent implements OnInit {
  uploader:FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  user:User;
  @Input() fundraiser:Fundraiser;
  fundraiserId:number;


  constructor(private fundraiserService:FundraisersService,private authService:AuthService,) { 
    this.authService.currentUser$.pipe(take(1)).subscribe(user=> this.user=user);
  }

  ngOnInit(): void {
    this.initializeUploader();
    console.log(this.fundraiser);
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photo: Photo) {
    this.fundraiserService.setMainPhoto(this.fundraiser.id, photo.id).subscribe(() => {
      this.fundraiser.url = photo.url;
      this.fundraiser.photos.forEach(p => {
        if (p.isMain) p.isMain = false;
        if (p.id === photo.id) p.isMain = true;
      })
    })
  } 

  deletePhoto(photoId: number) {
    this.fundraiserService.deletePhoto(this.fundraiser.id,photoId).subscribe(() => {
      this.fundraiser.photos = this.fundraiser.photos.filter(x => x.id !== photoId);
    })
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'fundraisers/add-photo/'+this.fundraiser.id,
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 20 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo: Photo = JSON.parse(response);
        this.fundraiser.photos.push(photo);
         if (photo.isMain) {
           this.fundraiser.url = photo.url;
         }
      }
    }
  }

}
