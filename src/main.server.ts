import 'zone.js';
import '@angular/platform-server/init';

import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export default function bootstrap() {
  return bootstrapApplication(AppComponent, config);
}
