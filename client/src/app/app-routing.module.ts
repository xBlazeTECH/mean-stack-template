import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './account/login/login.component';
import { ProfileComponent } from './account/profile/profile.component';
import { RegisterComponent } from './account/register/register.component';
import { CadComponent } from './cad/cad.component';
import { MdtComponent } from './mdt/mdt.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'account/login', component: LoginComponent },
  { path: 'account/register', component: RegisterComponent },
  {
    path: 'account/profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'cad', component: CadComponent},
  { path: 'mdt', component: MdtComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
