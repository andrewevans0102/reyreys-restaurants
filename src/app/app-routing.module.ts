import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user-accounts/login/login.component';
import { CreateAccountComponent } from './user-accounts/create-account/create-account.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MenuComponent } from './menu/menu.component';
import { WgViewComponent } from './wanna-go/wg-view/wg-view.component';
import { BtViewComponent } from './been-there/bt-view/bt-view.component';
import { BtEditComponent } from './been-there/bt-edit/bt-edit.component';
import { WgCreateComponent } from './wanna-go/wg-create/wg-create.component';
import { WgPromoteComponent } from './wanna-go/wg-promote/wg-promote.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'wg-view', component: WgViewComponent },
  { path: 'wg-create', component: WgCreateComponent },
  { path: 'wg-promote/:id', component: WgPromoteComponent },
  { path: 'bt-view', component: BtViewComponent },
  { path: 'bt-edit/:id', component: BtEditComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
