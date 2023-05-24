import { Routes } from '@angular/router';
import { CustomerLoginPage } from './pages/customer-login/customer-login.page';
import { HomePage } from './pages/home/home.page';

export const routes: Routes = [
  {
    path: '',
    //redirectTo: 'folder/inbox',
    component: localStorage.getItem("userId") !== null && localStorage.getItem("userId") !== '' ? HomePage : CustomerLoginPage,
    //pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'customer-login',
    loadComponent: () => import('./pages/customer-login/customer-login.page').then(m => m.CustomerLoginPage)
  },
  {
    path: 'customer-registration',
    loadComponent: () => import('./pages/customer-registration/customer-registration.page').then(m => m.CustomerRegistrationPage)
  },
  {
    path: 'my-request',
    loadComponent: () => import('./pages/my-request/my-request.page').then(m => m.MyRequestPage)
  },
  {
    path: 'my-sites',
    loadComponent: () => import('./pages/my-sites/my-sites.page').then(m => m.MySitesPage)
  },
  {
    path: 'change-password',
    loadComponent: () => import('./pages/change-password/change-password.page').then(m => m.ChangePasswordPage)
  },
  {
    path: 'about-app',
    loadComponent: () => import('./pages/about-app/about-app.page').then(m => m.AboutAppPage)
  },
  {
    path: 'home',
    loadComponent: () => HomePage
  },
  {
    path: 'add-request',
    loadComponent: () => import('./pages/add-request/add-request.page').then(m => m.AddRequestPage)
  },
];
