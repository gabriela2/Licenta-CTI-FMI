import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ToastrModule } from 'ngx-toastr';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { MembersListComponent } from './members/members-list/members-list.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AdsListComponent } from './ads/ads-list/ads-list.component';
import { AdCardComponent } from './ads/ad-card/ad-card.component';
import { AdDetailComponent } from './ads/ad-detail/ad-detail.component';
import { RatingUserComponent } from './ratings/rating-user/rating-user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TabsModule} from 'ngx-bootstrap/tabs';
import {NgxGalleryModule} from '@kolkov/ngx-gallery';
import { FundraiserCardComponent } from './fundraisers/fundraiser-card/fundraiser-card.component';
import { FundraiserDetailComponent } from './fundraisers/fundraiser-detail/fundraiser-detail.component';
import { FundraisersListComponent } from './fundraisers/fundraisers-list/fundraisers-list.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { MemberProfileComponent } from './members/member-profile/member-profile.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { RatingCardComponent } from './ratings/rating-card/rating-card.component';
import { EditRatingComponent } from './ratings/edit-rating/edit-rating.component';
import { AddRatingComponent } from './ratings/add-rating/add-rating.component';
import { ModalModule} from 'ngx-bootstrap/modal';
import { PreventEditReviewByOtherUsersGuard } from './guards/prevent-edit-review-by-other-users.guard';
import {NgxSpinnerModule} from 'ngx-spinner';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { AddFundraiserComponent } from './fundraisers/add-fundraiser/add-fundraiser.component';
import {FileUploadModule} from "ng2-file-upload";
import { EditUserPhotoComponent } from './members/edit-user-photo/edit-user-photo.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    EmailConfirmationComponent,
    ForgotPasswordComponent,
    TestErrorsComponent,
    NotFoundComponent,
    MembersListComponent,
    MemberCardComponent,
    AdsListComponent,
    AdCardComponent,
    AdDetailComponent,
    RatingUserComponent,
    FundraiserCardComponent,
    FundraiserDetailComponent,
    FundraisersListComponent,
    MemberProfileComponent,
    RatingCardComponent,
    EditRatingComponent,
    AddRatingComponent,
    MemberEditComponent,
    AddFundraiserComponent,
    EditUserPhotoComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({positionClass: 'toast-bottom-right',preventDuplicates:true}),
    NgbModule,
    TabsModule.forRoot(),
    NgxGalleryModule,
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    NgxSpinnerModule,
    FileUploadModule
    


  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    PreventEditReviewByOtherUsersGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
