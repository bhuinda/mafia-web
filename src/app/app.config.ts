import { importProvidersFrom, ApplicationConfig,  } from "@angular/core";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideRouter, Routes,  } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { routes } from "@app/app.routes";
import { authTokenInterceptor } from "@app/interceptors/authToken";

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule
    ),
    provideHttpClient(withInterceptors([authTokenInterceptor])),
    provideRouter(routes)
  ]
};
