import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Oauth2ClientPageComponent } from './oauth2/pages/oauth2-client/oauth2-client-page.component';
const routes: Routes = [
  {
    path: 'Authentication',
      children: [
        { path: 'Oauth2Client', component: Oauth2ClientPageComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
