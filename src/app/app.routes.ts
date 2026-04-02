import { Routes } from '@angular/router';

import { Home } from './home/home';
import { About } from './about/about';
import { Contact } from './pages/contact/contact';
import { Products } from './pages/products/products';
import { AddStory } from './pages/add-story/add-story';
import { AddProduct } from './pages/add-product/add-product';
import { Register } from './pages/register/register';
import { EditStory } from './pages/edit-story/edit-story';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'products', component: Products },
  { path: 'add-story', component: AddStory },
  { path: 'add-product', component: AddProduct },
  { path: 'register', component: Register },
  { path: 'edit/:id', component: EditStory },
];
