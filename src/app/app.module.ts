import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { JwtModule } from "@auth0/angular-jwt";
import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.route';

// PrimeNg
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {PaginatorModule} from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';

// Shared
import { HomeComponent } from './shared/components/home/home.component';
import { NotFoundRouteComponent } from './shared/components/common/notfound/notfound.component';
import { NotificationsHistoryModule } from './shared/components/notificationsHistory/notificationshistory.module';
import { UtilsGuard } from './shared/utils/utils.guard';
import { UtilsInterceptor, UtilsErrorInterceptor } from './shared/utils/utils.interceptor';
import { UnauthorizedRouteComponent } from './shared/components/common/unauthorized/unauthorized.component';
import {FilterPipe} from '../../src/app/shared/components/pipes/filter.pipe';
import {NgxPaginationModule} from 'ngx-pagination';

import '../assets/styles';
import { NotificationsService } from './modules/notifications/notifications.service';

@NgModule({
    declarations: [ 
        AppComponent,
        HomeComponent,
        NotFoundRouteComponent,
        UnauthorizedRouteComponent,
        FilterPipe
    ],
    imports: [ 
        ConfirmDialogModule,
        ToastModule,
        PaginatorModule,
        CardModule,
        InputTextModule,
        ButtonModule,
        TableModule,
        BrowserModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        PanelModule,
        DropdownModule,
        JwtModule,
        NotificationsHistoryModule,
        NgxPaginationModule,
        RouterModule.forRoot(APP_ROUTES,
            {
              useHash: true
            })
    ],
    providers: [ 
        UtilsGuard,
        NotificationsService,
        { provide: APP_BASE_HREF, useValue : '/' },
        { provide: HTTP_INTERCEPTORS, useClass: UtilsInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: UtilsErrorInterceptor, multi: true },
        { provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule {}