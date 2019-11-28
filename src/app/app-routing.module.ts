import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ContractCreateComponent} from './contract-create/contract-create.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HomeComponent} from './home/home.component';
import {ContractListComponent} from './contract-list/contract-list.component';
import {RegisterComponent} from './register/register.component';
import {ContractUpdateComponent} from './contract-update/contract-update.component';
import {ContractDetailComponent} from './contract-detail/contract-detail.component';
import {AuthGuard} from './auth/auth.guard';
import {StatisticsComponent} from './statistics/statistics.component';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';

const routes: Routes = [
  {path: '', redirectTo: 'home/login', pathMatch: 'full'},

  {
    path: 'home', component: HomeComponent, children: [
      {path: 'register', component: RegisterComponent},
      {path: 'login', component: LoginComponent},
    ]
  },

  {
    path: 'dashboard', component: DashboardComponent, children: [
      {path: 'contract-list', component: ContractListComponent},
      // {path: 'contract-list', component: ContractListComponent, canActivate: [AuthGuard]},
      {path: 'contract-create', component: ContractCreateComponent},
      {path: 'contract-detail/:id', component: ContractDetailComponent},
      {path: 'contract-update/:id', component: ContractUpdateComponent},
      {path: 'statistics', component: StatisticsComponent},
      {path: 'admin-panel', component: AdminPanelComponent},
    ]
  },

  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
