import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {
      provide: 'INITIAL_CONFIG',
      useValue: {
        document: '<!DOCTYPE html><html><head><title>ST Training</title></head><body><app-root></app-root></body></html>'
      }
    }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
