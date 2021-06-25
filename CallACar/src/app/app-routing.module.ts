import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { HistoryComponent } from './history/history.component';


const routes: Routes = [{path: 'history', component: HistoryComponent},
{ path: '**', component: IndexComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
