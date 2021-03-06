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
import { ToastrModule } from 'ngx-toastr';
import { MembersListComponent } from './members/members-list/members-list.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AdsListComponent } from './ads/ads-list/ads-list.component';
import { AdCardComponent } from './ads/ad-card/ad-card.component';
import { AdDetailComponent } from './ads/ad-detail/ad-detail.component';
import { RatingUserComponent } from './ratings/rating-user/rating-user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FundraiserCardComponent } from './fundraisers/fundraiser-card/fundraiser-card.component';
import { FundraiserDetailComponent } from './fundraisers/fundraiser-detail/fundraiser-detail.component';
import { FundraisersListComponent } from './fundraisers/fundraisers-list/fundraisers-list.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { MemberProfileComponent } from './members/member-profile/member-profile.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { RatingCardComponent } from './ratings/rating-card/rating-card.component';
import { EditRatingComponent } from './ratings/edit-rating/edit-rating.component';
import { AddRatingComponent } from './ratings/add-rating/add-rating.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { AddFundraiserComponent } from './fundraisers/add-fundraiser/add-fundraiser.component';
import { FileUploadModule } from "ng2-file-upload";
import { EditUserPhotoComponent } from './members/edit-user-photo/edit-user-photo.component';
import { MyAdsComponent } from './ads/my-ads/my-ads.component';
import { AddAdComponent } from './ads/add-ad/add-ad.component';
import { AdCardForMyAdsComponent } from './ads/ad-card-for-my-ads/ad-card-for-my-ads.component';
import { EditAdComponent } from './ads/edit-ad/edit-ad.component';
import { EditPhotoComponent } from './ads/edit-photo/edit-photo.component';
import { ViewDemandsComponent } from './ads/view-demands/view-demands.component';
import { DemandCardApprovedComponent } from './demands/demand-card-approved/demand-card-approved.component';
import { DemandCardUnapprovedComponent } from './demands/demand-card-unapproved/demand-card-unapproved.component';
import { MyFundraisersComponent } from './fundraisers/my-fundraisers/my-fundraisers.component';
import { FundraiserCardForMyFundraisersComponent } from './fundraisers/fundraiser-card-for-my-fundraisers/fundraiser-card-for-my-fundraisers.component';
import { EditFundraiserComponent } from './fundraisers/edit-fundraiser/edit-fundraiser.component';
import { ViewDonationsComponent } from './fundraisers/view-donations/view-donations.component';
import { EditPhotoFundraisersComponent } from './fundraisers/edit-photo-fundraisers/edit-photo-fundraisers.component';
import { CreateDonationComponent } from './fundraisers/create-donation/create-donation.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule} from 'ngx-bootstrap/buttons';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UserRoleDirective } from './directives/user-role.directive';
import { EditUserRolesComponent } from './admin/edit-user-roles/edit-user-roles.component';
import { ApproveFundraisersComponent } from './admin/approve-fundraisers/approve-fundraisers.component';
import { ReferenceTableAdministrationComponent } from './admin/reference-table-administration/reference-table-administration.component';
import { EditUserRolesModuleComponent } from './admin/edit-user-roles-module/edit-user-roles-module.component';
import { EditCategoriesModalComponent } from './admin/edit-categories-modal/edit-categories-modal.component';
import { AddCategoryModalComponent } from './admin/add-category-modal/add-category-modal.component';
import { AddUnitofmeasureModalComponent } from './admin/add-unitofmeasure-modal/add-unitofmeasure-modal.component';
import { EditUnitofmeasureModalComponent } from './admin/edit-unitofmeasure-modal/edit-unitofmeasure-modal.component';
import { EditDeliveryTypeModalComponent } from './admin/edit-delivery-type-modal/edit-delivery-type-modal.component';
import { AddDeliveryTypeModalComponent } from './admin/add-delivery-type-modal/add-delivery-type-modal.component';
import { FundraiserCardUnapprovedComponent } from './admin/fundraiser-card-unapproved/fundraiser-card-unapproved.component';
import { MyDemandsComponent } from './demands/my-demands/my-demands.component';
import { EditDemandComponent } from './demands/edit-demand/edit-demand.component';
import { DemandCardApprovedForMyDemandsComponent } from './demands/demand-card-approved-for-my-demands/demand-card-approved-for-my-demands.component';
import { DemandCardNotApprovedForMyDemandsComponent } from './demands/demand-card-not-approved-for-my-demands/demand-card-not-approved-for-my-demands.component';
import { MyDonationsComponent } from './donations/my-donations/my-donations.component';
import { DonationCardComponent } from './donations/donation-card/donation-card.component';
import { MessageComponent } from './messages/message/message.component';
import { ChatComponent } from './messages/chat/chat.component';
import { FavouriteListComponent } from './favouriteLists/favourite-list/favourite-list.component';
import { FavouriteAdsComponent } from './favouriteLists/favourite-ads/favourite-ads.component';
import { FavouriteFundraisersComponent } from './favouriteLists/favourite-fundraisers/favourite-fundraisers.component';
import { NotConfirmedEmailComponent } from './not-confirmed-email/not-confirmed-email.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ApproveAdsComponent } from './admin/approve-ads/approve-ads.component';
import { AdsCardUnapprovedComponent } from './admin/ads-card-unapproved/ads-card-unapproved.component';
import { ApproveUserRatingsComponent } from './admin/approve-user-ratings/approve-user-ratings.component';
import { UserRatingCardUnapprovedComponent } from './admin/user-rating-card-unapproved/user-rating-card-unapproved.component';
import { MyReviewsComponent } from './ratings/my-reviews/my-reviews.component';
import { CardForMyReviewsComponent } from './ratings/card-for-my-reviews/card-for-my-reviews.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    EmailConfirmationComponent,
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
    MyAdsComponent,
    AddAdComponent,
    AdCardForMyAdsComponent,
    EditAdComponent,
    EditPhotoComponent,
    ViewDemandsComponent,
    DemandCardApprovedComponent,
    DemandCardUnapprovedComponent,
    MyFundraisersComponent,
    FundraiserCardForMyFundraisersComponent,
    EditFundraiserComponent,
    ViewDonationsComponent,
    EditPhotoFundraisersComponent,
    CreateDonationComponent,
    AdminDashboardComponent,
    UserRoleDirective,
    EditUserRolesComponent,
    ApproveFundraisersComponent,
    ReferenceTableAdministrationComponent,
    EditUserRolesModuleComponent,
    EditCategoriesModalComponent,
    AddCategoryModalComponent,
    AddUnitofmeasureModalComponent,
    EditUnitofmeasureModalComponent,
    EditDeliveryTypeModalComponent,
    AddDeliveryTypeModalComponent,
    FundraiserCardUnapprovedComponent,
    MyDemandsComponent,
    EditDemandComponent,
    DemandCardApprovedForMyDemandsComponent,
    DemandCardNotApprovedForMyDemandsComponent,
    MyDonationsComponent,
    DonationCardComponent,
    MessageComponent,
    ChatComponent,
    FavouriteListComponent,
    FavouriteAdsComponent,
    FavouriteFundraisersComponent,
    NotConfirmedEmailComponent,
    ApproveAdsComponent,
    AdsCardUnapprovedComponent,
    ApproveUserRatingsComponent,
    UserRatingCardUnapprovedComponent,
    MyReviewsComponent,
    CardForMyReviewsComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right', preventDuplicates: true }),
    NgbModule,
    TabsModule.forRoot(),
    NgxGalleryModule,
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    NgxSpinnerModule,
    FileUploadModule,
    PaginationModule.forRoot(),
    ButtonsModule,
    CarouselModule.forRoot(),



  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
