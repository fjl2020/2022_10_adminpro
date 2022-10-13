import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PagesRoutingModule } from './pages/pages-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';

import { NotpagefoundComponent } from './notpagefound/notpagefound.component';

const routes: Routes = [
  //Dashboard PagesRouting module
  //login o register AuthRouting module
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'progress', redirectTo: 'dashboard/progress', pathMatch: 'full' },
  { path: '**', component: NotpagefoundComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes), PagesRoutingModule, AuthRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
