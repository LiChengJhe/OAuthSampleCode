import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AccountRoutingModule
  ],
  providers: [],
  declarations: []
})
export class AccountModule { }
