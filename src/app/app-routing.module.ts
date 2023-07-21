import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoreDetailsComponent } from './more-details/more-details.component';
import { ListeDesPaysComponent } from './liste-des-pays/liste-des-pays.component';

const routes: Routes = [
 { path: '', redirectTo: '/liste', pathMatch: 'full' },
  { path: 'liste', component: ListeDesPaysComponent },
  { path: 'details/:id', component: MoreDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
