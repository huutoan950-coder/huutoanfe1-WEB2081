import { Routes } from '@angular/router';

import { Home } from './home/home';
import { About } from './about/about'; // Đổi thành About
import { Contact } from './pages/contact/contact'; // Đổi thành Contact
import { Products } from './pages/products/products'; // Đổi thành Products

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'products', component: Products },
];
