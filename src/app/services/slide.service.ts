import { Injectable } from '@angular/core';
import { CourseSlides, Slide } from '../models/slide.model';
import { Observable, of } from 'rxjs';
import { springBootSlides } from '../data/springboot-slides.data';
import { reactSlides } from '../data/react-slides.data';
import { typescriptSlides } from '../data/typescript-slides.data';
import { javaSlides } from '../data/java-slides.data'
import { accessibilitySlides } from '../data/accessibility-slides.data';
import { nodejsSlides } from '../data/nodejs-slides.data';

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
      case 'accessibility':
        return of(accessibilitySlides.slides);
      case 'nodejs':
        return of(nodejsSlides.slides);
      default:
        return of([]);
    }
  }
} 