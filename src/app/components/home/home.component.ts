import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule],
  template: `
    <div class="container">
      <div class="category-grid">
        <mat-card *ngFor="let category of categories" [routerLink]="['/slides', category.id]" class="category-card">
          <div class="card-content">
            <mat-icon class="category-icon">{{category.icon}}</mat-icon>
            <div class="category-text">
              <h2>{{category.name}}</h2>
              <p>{{category.description}}</p>
            </div>
          </div>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }

    .category-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      padding: 20px;
    }

    .category-card {
      cursor: pointer;
      transition: transform 0.2s;

      &:hover {
        transform: translateY(-5px);
      }
    }

    .card-content {
      display: flex;
      align-items: center;
      padding: 20px;
      gap: 20px;
    }

    .category-icon {
      font-size: 40px;
      height: 40px;
      width: 40px;
      color: #0078d4;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .category-text {
      h2 {
        margin: 0;
        font-size: 1.5rem;
        color: #333;
      }

      p {
        margin: 8px 0 0;
        color: #666;
      }
    }
  `]
})
export class HomeComponent {
  categories = [
    {
      id: 'springboot',
      name: 'Spring Boot',
      icon: 'eco',
      description: 'Learn Spring Boot fundamentals and advanced concepts'
    },
    {
      id: 'angular',
      name: 'Angular',
      icon: 'web',
      description: 'Master Angular framework and best practices'
    },
    {
      id: 'dotnetcore',
      name: '.NET Core',
      icon: 'developer_board',
      description: 'Build modern applications with .NET Core and C#'
    },
    {
      id: 'python',
      name: 'Python',
      icon: 'code',
      description: 'Learn Python programming from basics to advanced'
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      icon: 'javascript',
      description: 'Master modern JavaScript and ES6+ features'
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      icon: 'integration_instructions',
      description: 'Learn TypeScript for scalable JavaScript applications'
    },
    {
      id: 'java',
      name: 'Java',
      icon: 'coffee',
      description: 'Core Java programming and advanced concepts'
    },
    {
      id: 'docker',
      name: 'Docker',
      icon: 'devices_other',
      description: 'Learn containerization with Docker'
    },
    {
      id: 'kubernetes',
      name: 'Kubernetes',
      icon: 'cloud',
      description: 'Master container orchestration with Kubernetes'
    },
    {
      id: 'aws',
      name: 'AWS',
      icon: 'cloud_queue',
      description: 'Learn Amazon Web Services cloud platform'
    },
    {
      id: 'react',
      name: 'React',
      icon: 'grain',
      description: 'Build modern web applications with React'
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      icon: 'code',
      description: 'Server-side JavaScript with Node.js'
    },
    {
      id: 'sql',
      name: 'SQL',
      icon: 'storage',
      description: 'Master database programming with SQL'
    },
    {
      id: 'accessibility',
      name: 'Web Accessibility (A11y)',
      icon: 'accessibility_new',
      description: 'Learn web accessibility standards and implementation'
    }
  ];
} 