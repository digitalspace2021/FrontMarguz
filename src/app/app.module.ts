import { JwtInterceptorInterceptor } from './auth/interceptor/jwt-interceptor.interceptor';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import {
  faSortDown,
  faEdit,
  faUserCheck,
  faWindowClose,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { AngularFileUploaderModule } from 'angular-file-uploader';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import localeEs from '@angular/common/locales/es-CO';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es-CO');
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    AppRoutingModule,
    AngularFileUploaderModule, //BrowserAnimationsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CO' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faSortDown);
    library.addIcons(faEdit);
    library.addIcons(faUserCheck);
    library.addIcons(faWindowClose);
    library.addIcons(faTrashAlt);
  }
}
