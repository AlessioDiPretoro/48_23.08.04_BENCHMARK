import { PreferListComponent } from './pages/prefer-list/prefer-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './pages/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'signup',
    component: RegisterComponent,
    // canActivate: [!AuthGuard],
  },
  {
    path: 'signup/:id',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [!AuthGuard],
  },
  {
    path: 'preferList',
    component: PreferListComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'pages/auth',
  //   loadChildren: () =>
  //     import('./pages/auth/auth.module').then((m) => m.AuthModule),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
