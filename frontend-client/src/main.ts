import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app/app';

// Modified appConfig with HTTP provider
const appConfig = {
  providers: [provideHttpClient()]
};

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
