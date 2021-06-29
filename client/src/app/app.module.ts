import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './main/home/home.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { AuthenticationService } from './services/auth/authentication.service';
import { AuthGuardService } from './services/auth/auth-guard.service';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { MdtComponent } from './main/mdt/mdt.component';
import { CadComponent } from './main/cad/cad.component';
import { PreloaderComponent } from './shared/preloader/preloader.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { AccountComponent } from './account/account.component';

const config: SocketIoConfig = { url: 'http://localhost:9000/', options: {}};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MdtComponent,
    CadComponent,
    PreloaderComponent,
    HeaderComponent,
    SidebarComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [AuthenticationService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
