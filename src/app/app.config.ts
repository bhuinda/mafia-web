import { importProvidersFrom, ApplicationConfig, inject, APP_INITIALIZER,  } from "@angular/core";
import { HttpClient, provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideRouter } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { routes } from "@app/app.routes";
import { authInterceptor } from "@app/interceptors/auth";
import { AppService } from "./app.service";

export const appConfig: ApplicationConfig = {

  providers: [
    provideRouter(routes),
    importProvidersFrom(
      BrowserModule
    ),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: (appService: AppService) => () => appService.init(),
      deps: [AppService],
      multi: true
    }
  ]
};
