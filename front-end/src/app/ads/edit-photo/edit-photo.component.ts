import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs/operators';
import { Ad } from 'src/app/models/ad';
import { Photo } from 'src/app/models/photo';
import { User } from 'src/app/models/user';
import { AdsService } from 'src/app/services/ads.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-photo',
  templateUrl: './edit-photo.component.html',
  styleUrls: ['./edit-photo.component.css']
})
export class EditPhotoComponent implements OnInit {
  uploader:FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  user:User;
  @Input() ad:Ad;


  constructor(private adService:AdsService,private authService:AuthService,) { 
    this.authService.currentUser$.pipe(take(1)).subscribe(user=> this.user=user);
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photo: Photo) {
    this.adService.setMainPhoto(this.ad.id,photo.id).subscribe(() => {
      this.ad.url = photo.url;
      this.ad.photos.forEach(p => {
        if (p.isMain) p.isMain = false;
        if (p.id === photo.id) p.isMain = true;
      })
    })
  } 

  deletePhoto(photoId: number) {
    this.adService.deletePhoto(this.ad.id,photoId).subscribe(() => {
      this.ad.photos = this.ad.photos.filter(x => x.id !== photoId);
    })
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'ads/add-photo/'+this.ad.id,
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
        this.ad.photos.push(photo);
         if (photo.isMain) {
           this.ad.url = photo.url;
         }
      }
    }
  }

}
