import { Routes } from '@angular/router';
import { MainPage } from './features/main-page/main-page';
import { ManageCars } from './features/manage-cars/manage-cars';
import { AdminPanel } from './features/admin-panel/admin-panel';
import { Signup } from './features/signup/signup';
import { Signin } from './features/signin/signin';
import { ManageReservations } from './features/manage-reservations/manage-reservations';
import { CarPage } from './features/car-page/car-page';
import { ProfilePage } from './features/profile-page/profile-page';

export const routes: Routes = [
  { path: '', component: MainPage },
  { path: 'manage-cars', component: ManageCars },
  { path: 'admin-panel', component: AdminPanel },
  { path: 'signup', component: Signup },
  { path: 'signin', component: Signin },
  { path: 'manage-reservations', component: ManageReservations },
  { path: 'car-page/:id', component: CarPage },
  { path: 'profile', component: ProfilePage },
  { path: '**', redirectTo: '' },
];
