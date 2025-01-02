import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './core/core.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import '@angular/common/locales/global/ru';
import {SharedModule} from './shared/shared.module';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import Material from '@primeng/themes/Material';

@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CoreModule,
        SharedModule], providers: [
          provideHttpClient(withInterceptorsFromDi()),
          provideAnimationsAsync(),
            providePrimeNG({
             theme: {
            preset: Material
        }
    })
  ]
})
export class AppModule { }
