import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { JwtModule } from "@auth0/angular-jwt";
import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.route';

// Shared
import { NotFoundRouteComponent } from './shared/components/common/notfound/notfound.component';
import { NotificationsHistoryModule } from './shared/components/notificationsHistory/notificationshistory.module';
import { UtilsGuard } from './shared/utils/utils.guard';
import { UtilsInterceptor, UtilsErrorInterceptor } from './shared/utils/utils.interceptor';
import { UnauthorizedRouteComponent } from './shared/components/common/unauthorized/unauthorized.component';

import '../assets/styles';
import { NotificationsService } from './modules/notifications/notifications.service';
import { PruebaModule } from './shared/components/prueba/prueba.module';
import { HomeModule } from './shared/components/home/home.module';


@NgModule({
    declarations: [
        AppComponent,
        NotFoundRouteComponent,
        UnauthorizedRouteComponent,
    ],
    imports: [
        HomeModule,
        PruebaModule,
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        JwtModule,
        NotificationsHistoryModule,
        RouterModule.forRoot(APP_ROUTES,
            {
                useHash: true
            })
    ],
    providers: [
        UtilsGuard,
        NotificationsService,
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: HTTP_INTERCEPTORS, useClass: UtilsInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: UtilsErrorInterceptor, multi: true },
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }