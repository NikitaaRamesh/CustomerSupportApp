import { AppRoutingRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injector, APP_INITIALIZER, NgModule } from '@angular/core';
import { LOCATION_INITIALIZED } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { GridRowDetailComponent } from './examples/grid-rowdetail.component';
import { HomeComponent } from './examples/home.component';
import { RowDetailPreloadComponent } from './examples/rowdetail-preload.component';
import { RowDetailViewComponent } from './examples/rowdetail-view.component';
import { MainGridPageComponent } from './main-grid-page/main-grid-page.component';
// import our custom module, library created using this article
// https://medium.com/@ngl817/building-an-angular-4-component-library-with-the-angular-cli-and-ng-packagr-53b2ade0701e
import { AngularSlickgridModule } from './modules/angular-slickgrid/modules/angular-slickgrid.module';
// import { SlickgridModule } from 'angular-slickgrid';

// load necessary Flatpickr Locale(s), but make sure it's imported AFTER the SlickgridModule import
import 'flatpickr/dist/l10n/fr';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';


// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// use an Initializer Factory as describe here: https://github.com/ngx-translate/core/issues/517#issuecomment-299637956
export function appInitializerFactory(translate: TranslateService, injector: Injector) {
  return () => new Promise<any>((resolve: any) => {
    const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
    locationInitialized.then(() => {
      const langToSet = 'en';
      translate.setDefaultLang('en');
      translate.use(langToSet).subscribe({
        next: () => {
          // console.info(`Successfully initialized '${langToSet}' language.'`);
        },
        error: () => console.error(`Problem with '${langToSet}' language initialization.'`),
        complete: () => resolve(null)
      });
    });
  });
}

// @dynamic
@NgModule({
  declarations: [
    AppComponent,
    GridRowDetailComponent,
    RowDetailPreloadComponent,
    RowDetailViewComponent,
    HomeComponent,
    MainGridPageComponent,
    UserDetailsComponent,
    LoginPageComponent,
    SignUpComponent,
  ],
  imports: [
    AppRoutingRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,


    TabsModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    AngularSlickgridModule.forRoot({
      // add any Global Grid Options/Config you might want
      // to avoid passing the same options over and over in each grids of your App
      enableAutoResize: true,
      autoResize: {
        container: '#grid-container',
        rightPadding: 10
      }
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService, Injector],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }