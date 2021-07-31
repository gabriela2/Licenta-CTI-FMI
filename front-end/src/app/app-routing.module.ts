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


import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MembersListComponent } from './members/members-list/members-list.component';
import { RatingUserComponent } from './rating-user/rating-user.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate:[AuthGuard],
    children: [
      { path: 'emailConfirmation/:id', component: EmailConfirmationComponent },
      { path: 'ads-list', component: AdsListComponent },
      { path: 'fundraisers-list', component: FundraisersListComponent },
      { path: 'rating-user/:id', component: RatingUserComponent },
      {path:'ads-list/:id',component:AdDetailComponent},
      {path:'fundraisers-list/:id',component:FundraiserDetailComponent},

    ]
  },
  {path:'members-list',component:MembersListComponent},
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
