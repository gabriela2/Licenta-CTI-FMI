import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdDetailComponent } from './ads/ad-detail/ad-detail.component';
import { AddAdComponent } from './ads/add-ad/add-ad.component';
import { AdsListComponent } from './ads/ads-list/ads-list.component';
import { EditAdComponent } from './ads/edit-ad/edit-ad.component';
import { MyAdsComponent } from './ads/my-ads/my-ads.component';
import { ViewDemandsComponent } from './ads/view-demands/view-demands.component';
import { EditDemandComponent } from './demands/edit-demand/edit-demand.component';
import { MyDemandsComponent } from './demands/my-demands/my-demands.component';
import { MyDonationsComponent } from './donations/my-donations/my-donations.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AddFundraiserComponent } from './fundraisers/add-fundraiser/add-fundraiser.component';
import { EditFundraiserComponent } from './fundraisers/edit-fundraiser/edit-fundraiser.component';
import { FundraiserDetailComponent } from './fundraisers/fundraiser-detail/fundraiser-detail.component';
import { FundraisersListComponent } from './fundraisers/fundraisers-list/fundraisers-list.component';
import { MyFundraisersComponent } from './fundraisers/my-fundraisers/my-fundraisers.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { PreventEditAdByOtherUsersGuard } from './guards/prevent-edit-ad-by-other-users.guard';
import { PreventEditFundraiserByOtherUsersGuard } from './guards/prevent-edit-fundraiser-by-other-users.guard';
import { PreventEditReviewByOtherUsersGuard } from './guards/prevent-edit-review-by-other-users.guard';
import { PreventUnsavedChangesForAddAdGuard } from './guards/prevent-unsaved-changes-for-add-ad.guard';
import { PreventUnsavedChangesForAddRatingGuard } from './guards/prevent-unsaved-changes-for-add-rating.guard';
import { PreventUnsavedChangesForEditAdGuard } from './guards/prevent-unsaved-changes-for-edit-ad.guard';
import { PreventUnsavedChangesForEditFundraiserGuard } from './guards/prevent-unsaved-changes-for-edit-fundraiser.guard';
import { PreventUnsavedChangesForEditRatingGuard } from './guards/prevent-unsaved-changes-for-edit-rating.guard';
import { PreventUnsavedChangesForProfileGuard } from './guards/prevent-unsaved-changes-for-profile.guard';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberProfileComponent } from './members/member-profile/member-profile.component';
import { MembersListComponent } from './members/members-list/members-list.component';
import { AddRatingComponent } from './ratings/add-rating/add-rating.component';
import { EditRatingComponent } from './ratings/edit-rating/edit-rating.component';
import { RatingUserComponent } from './ratings/rating-user/rating-user.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'emailConfirmation/:id', component: EmailConfirmationComponent },
      { path: 'ads-list', component: AdsListComponent },
      { path: 'fundraisers-list', component: FundraisersListComponent },
      { path: 'rating-user/:id', component: RatingUserComponent },
      { path: 'edit-rating/:id', component: EditRatingComponent, canDeactivate: [PreventUnsavedChangesForEditRatingGuard], canActivate: [PreventEditReviewByOtherUsersGuard] },
      { path: 'add-rating/:id', component: AddRatingComponent, canDeactivate: [PreventUnsavedChangesForAddRatingGuard] },
      { path: 'member/edit', component: MemberEditComponent, canDeactivate: [PreventUnsavedChangesForProfileGuard] },
      { path: 'member-profile/:id', component: MemberProfileComponent },
      { path: 'ads-list/:id', component: AdDetailComponent },
      { path: 'fundraisers-list/:id', component: FundraiserDetailComponent },
      { path: 'my-ads', component: MyAdsComponent },
      { path: 'my-fundraisers', component: MyFundraisersComponent },
      { path: 'my-demands', component: MyDemandsComponent },
      { path: 'my-donations', component: MyDonationsComponent },
      { path: 'edit-demand/:id', component: EditDemandComponent },
      { path: 'add-ad', component: AddAdComponent, canDeactivate: [PreventUnsavedChangesForAddAdGuard] },
      { path: 'add-fundraiser', component: AddFundraiserComponent },
      { path: 'view-demands/:id', component: ViewDemandsComponent, canActivate: [PreventEditAdByOtherUsersGuard] },
      { path: 'edit-ad/:id', component: EditAdComponent, canDeactivate: [PreventUnsavedChangesForEditAdGuard], canActivate: [PreventEditAdByOtherUsersGuard] },
      { path: 'edit-fundraiser/:id', component: EditFundraiserComponent, canDeactivate: [PreventUnsavedChangesForEditFundraiserGuard], canActivate: [PreventEditFundraiserByOtherUsersGuard] },
      { path: 'admin', component: AdminDashboardComponent, canActivate: [AdminGuard] },
    ]
  },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
