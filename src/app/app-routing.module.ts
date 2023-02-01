import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    // Standalone Component
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    // auth Module
    loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule)
  },
  {
    path: 'dashboard',
    // Dashboard Module
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    // Forms Module
    loadChildren: () => import('./forms/forms.module').then(m => m.GformsModule)
  },
  {
    path: "**",
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
