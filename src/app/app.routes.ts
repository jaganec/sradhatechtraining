import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SlideViewerComponent } from './components/slide-viewer/slide-viewer.component';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    pathMatch: 'full'
  },
  { 
    path: 'slides/:category', 
    component: SlideViewerComponent 
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];
