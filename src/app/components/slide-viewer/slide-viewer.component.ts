import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Params } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MarkdownModule, MarkdownService, provideMarkdown } from 'ngx-markdown';
import { SlideService } from '../../services/slide.service';
import { Slide } from '../../models/slide.model';

@Component({
  selector: 'app-slide-viewer',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatTooltipModule,
    MarkdownModule
  ],
  providers: [
    MarkdownService,
    provideMarkdown()
  ],
  template: `
    <div class="slide-container">
      <mat-card *ngIf="currentSlide">
        <mat-card-header>
          <mat-card-title>{{currentSlide.topic}}</mat-card-title>
          <mat-card-subtitle class="slide-subtitle">
            {{category | titlecase}} Training - Slide {{currentIndex + 1}} of {{slides.length}}
          </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p class="description">{{currentSlide.description}}</p>
          
          <!-- Content Section -->
          <div class="content-section" *ngIf="currentSlide.content">
            <div *ngFor="let item of currentSlide.content">
              <markdown [data]="item"></markdown>
            </div>
          </div>

          <!-- Code Section -->
          <div class="code-block" *ngIf="currentSlide.code">
            <markdown [data]="getCodeBlock(currentSlide.code, currentSlide.language)"></markdown>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Mobile-friendly floating navigation -->
      <div class="floating-nav">
        <div class="nav-group">
          <button mat-mini-fab color="primary" 
                  [disabled]="currentIndex === 0"
                  (click)="previousSlide()"
                  matTooltip="Previous Slide">
            <mat-icon>arrow_back</mat-icon>
          </button>

          <button mat-mini-fab color="primary" 
                  [matMenuTriggerFor]="slideMenu"
                  matTooltip="Jump to Slide">
            <mat-icon>list</mat-icon>
          </button>
        </div>

        <div class="nav-group">
          <button mat-mini-fab color="primary" 
                  routerLink="/"
                  matTooltip="Home">
            <mat-icon>home</mat-icon>
          </button>

          <button mat-mini-fab color="primary"
                  [disabled]="currentIndex === slides.length - 1"
                  (click)="nextSlide()"
                  matTooltip="Next Slide">
            <mat-icon>arrow_forward</mat-icon>
          </button>
        </div>
      </div>

      <!-- Mobile-optimized menu -->
      <mat-menu #slideMenu="matMenu" class="slide-menu">
        <div class="menu-header">
          <h3>Quick Navigation</h3>
        </div>
        <mat-divider></mat-divider>
        <div class="menu-content">
          <button mat-menu-item *ngFor="let slide of slides; let i = index"
                  (click)="goToSlide(i)"
                  [class.active]="i === currentIndex">
            <div class="slide-menu-item">
              <span class="slide-number">{{i + 1}} - </span>
              <span class="slide-topic">{{slide.topic}}</span>
            </div>
          </button>
        </div>
      </mat-menu>
    </div>
  `,
  styleUrls: ['./slide-viewer.component.scss']
})
export class SlideViewerComponent implements OnInit {
  category: string = '';
  slides: Slide[] = [];
  currentIndex: number = 0;
  currentSlide?: Slide;

  constructor(
    private route: ActivatedRoute,
    private slideService: SlideService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.category = params['category'];
      this.loadSlides();
    });
  }

  loadSlides() {
    this.slideService.getSlidesByCategory(this.category).subscribe(slides => {
      this.slides = slides;
      this.currentSlide = slides[0];
      this.currentIndex = 0;
    });
  }

  nextSlide() {
    if (this.currentIndex < this.slides.length - 1) {
      this.currentIndex++;
      this.currentSlide = this.slides[this.currentIndex];
    }
  }

  previousSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.currentSlide = this.slides[this.currentIndex];
    }
  }

  getCodeBlock(code: string, language: string): string {
    return `\`\`\`${language}\n${code}\n\`\`\``;
  }

  goToSlide(index: number) {
    if (index >= 0 && index < this.slides.length) {
      this.currentIndex = index;
      this.currentSlide = this.slides[index];
      // Scroll to top when changing slides
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
} 