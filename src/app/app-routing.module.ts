import {NgModule} from '@angular/core';
import {Route, RouterModule, Routes} from '@angular/router';

const routs: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(routs)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
