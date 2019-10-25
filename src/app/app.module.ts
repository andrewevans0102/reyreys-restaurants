import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PopupModalComponent } from './popup-modal/popup-modal.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './user-accounts/login/login.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { CreateAccountComponent } from './user-accounts/create-account/create-account.component';
import { MenuComponent } from './menu/menu.component';
import { WgViewComponent } from './wanna-go/wg-view/wg-view.component';
import { BtViewComponent } from './been-there/bt-view/bt-view.component';
import { BtEditComponent } from './been-there/bt-edit/bt-edit.component';
import { WgCreateComponent } from './wanna-go/wg-create/wg-create.component';
import { WgPromoteComponent } from './wanna-go/wg-promote/wg-promote.component';

@NgModule({
  declarations: [
    AppComponent,
    PopupModalComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    CreateAccountComponent,
    MenuComponent,
    WgViewComponent,
    BtViewComponent,
    BtEditComponent,
    WgCreateComponent,
    WgPromoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  entryComponents: [PopupModalComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
