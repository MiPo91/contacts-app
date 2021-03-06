import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ContactListComponent} from './contact/contact-list/contact-list.component';
import {ContactService} from './contact/services/contact.service';
import {ContactListItemComponent} from './contact/contact-list/contact-list-item/contact-list-item.component';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatExpansionModule, MatIconModule, MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {RouterModule, Routes} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ContactDetailsComponent} from './contact/contact-details/contact-details.component';
import {ContactAddressPipe} from './contact/pipes/contact-address.pipe';
import {ToolbarComponent} from './toolbar/toolbar/toolbar.component';
import {ToolbarService} from './toolbar/toolbar.service';
import {MapComponent} from './map/map.component';
import {MapLayoutCardComponent} from './map/map-layout-card/map-layout-card.component';
import {SafeUrlPipe} from './utils/safe-url.pipe';
import {LoginComponent} from './user/login/login.component';
import {UserService} from './user/user.service';
import {LayoutModule} from '@angular/cdk/layout';
import {AuthenticationGuard} from './guard/authentication.guard';
import {HttpContactService} from './contact/services/http-contact.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppLayoutComponent} from './layout/app-layout/app-layout.component';
import {CaHttpInterceptor} from './config/ca-http-interceptor';
import {DialogsService} from './dialogs/dialogs.service';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'ca',
    component: AppLayoutComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: '',
        component: ContactListComponent
      },
      {
        path: 'contacts',
        component: ContactListComponent,
      },
      {
        path: 'add-contact',
        component: ContactDetailsComponent
      }, {
        path: 'contacts/:id',
        component: ContactDetailsComponent
      }, {
        path: 'map',
        component: MapLayoutCardComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactListItemComponent,
    ContactDetailsComponent,
    ContactAddressPipe,
    ToolbarComponent,
    MapComponent,
    MapLayoutCardComponent,
    SafeUrlPipe,
    LoginComponent,
    AppLayoutComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    RouterModule.forRoot(routes),
    FlexLayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    LayoutModule,
    HttpClientModule,
    MatDialogModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
  ],
  entryComponents: [ConfirmDialogComponent],
  providers: [
    ContactService,
    ToolbarService,
    UserService,
    AuthenticationGuard,
    HttpContactService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CaHttpInterceptor,
      multi: true
    },
    DialogsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
