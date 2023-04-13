import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import { RegistrationComponent } from './registration/registration.component';
import { CustomerComponent } from './customer/customer.component';
const routes: Routes = [
  {path: "login",component: AuthComponent},
  {path: "adminPanel",component: AdminPanelComponent},
  {path: "registration",component: RegistrationComponent},
  {path: "customer",component: CustomerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
