import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  imports: [
    // ... other imports
    MarkdownModule.forRoot()
  ]
})
export class AppModule { } 