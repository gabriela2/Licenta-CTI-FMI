import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdDetailComponent } from './ads/ad-detail/ad-detail.component';
import { AdsListComponent } from './ads/ads-list/ads-list.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FundraiserDetailComponent } from './fundraisers/fundraiser-detail/fundraiser-detail.component';
import { FundraisersListComponent } from './fundraisers/fundraisers-list/fundraisers-list.component';
import { AuthGuard } from './guards/auth.guard';
import { PreventEditReviewByOtherUsersGuard } from './guards/prevent-edit-review-by-other-users.guard';
import { PreventUnsavedChangesForAddRatingGuard } from './guards/prevent-unsaved-changes-for-add-rating.guard';
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

    ]
  },
  { path: 'members-list', component: MembersListComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'errors', component: TestErrorsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
