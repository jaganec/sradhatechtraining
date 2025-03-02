import { Injectable } from '@angular/core';
import { CourseSlides, Slide } from '../models/slide.model';
import { Observable, of } from 'rxjs';
import { springBootSlides } from '../data/springboot-slides.data';
import { reactSlides } from '../data/react-slides.data';
import { typescriptSlides } from '../data/typescript-slides.data';
import { javaSlides } from '../data/java-slides.data'

@Injectable({
  providedIn: 'root'
})
export class SlideService {
  getSlidesByCategory(category: string): Observable<Slide[]> {
    switch (category) {
      case 'springboot':
        return of(springBootSlides.slides);
      case 'react':
        return of(reactSlides.slides);
      case 'typescript':
        return of(typescriptSlides.slides);
      case 'java':
        return of(javaSlides.slides);
      default:
        return of([]);
    }
  }
} 