export interface Slide {
  id: number;
  topic: string;
  description: string;
  content?: string[];
  code?: string;
  language: string;
}

export interface CourseSlides {
  category: string;
  slides: Slide[];
} 