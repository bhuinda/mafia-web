import { importProvidersFrom, ApplicationConfig,  } from "@angular/core";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideRouter } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { routes } from "@app/app.routes";
import { authInterceptor } from "@app/interceptors/auth";

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule
    ),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes)
  ]
};
