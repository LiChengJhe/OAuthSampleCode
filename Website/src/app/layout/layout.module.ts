import { NgModule } from '@angular/core';
import { LayoutRoutingModule } from './layout-routing.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { ViewStartComponent } from './pages/view-start/view-start.component';
import { NavBarComponent } from './components/navs/nav-bar/nav-bar.component';
import { FooterBarComponent } from './components/footers/footer-bar/footer-bar.component';
import { ContentBarComponent } from './components/contents/content-bar/content-bar.component';




@NgModule({
  imports: [
    AuthenticationModule,
    LayoutRoutingModule
  ],
  declarations: [
    ViewStartComponent,
    NavBarComponent,
    FooterBarComponent,
    ContentBarComponent
  ],
  exports: [
    ViewStartComponent
  ]
})
export class LayoutModule { }
