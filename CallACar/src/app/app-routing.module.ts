import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { HistoryComponent } from './history/history.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AccountComponent } from './account/account.component';
import { UserHistoryComponent } from './user-history/user-history.component';


const routes: Routes = [
  { path: 'history', component: HistoryComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'rides', component: UserHistoryComponent },
  { path: 'account', component: AccountComponent},
  { path: 'login', component: LoginComponent },
  { path: '**', component: IndexComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
