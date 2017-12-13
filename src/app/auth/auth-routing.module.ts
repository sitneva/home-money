import {NgModule} from '@angular/core';
import {Route, RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {AuthComponent} from './auth.component';

const routs: Routes = [
  {path: '', component: AuthComponent, children: [
    {path: 'login', component: LoginComponent},
    {path: 'registration', component: RegistrationComponent}
  ]}

]

@NgModule({
  imports: [RouterModule.forChild(routs)],
  exports: [RouterModule]
})

export class AuthRoutingModule {}
