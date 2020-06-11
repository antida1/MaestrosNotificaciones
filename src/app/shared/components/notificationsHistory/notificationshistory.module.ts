import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';  

import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { MessageService, DialogService, ConfirmationService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { ChipsModule } from 'primeng/chips';
import { CalendarModule } from 'primeng/calendar';

import { NotificationsHistoryService } from './notificationshistory.service';
import { NotificationsHistoryFilterTypeComponent } from './filters/type/type.component';
import { NotificationsHistoryResultsComponent } from './results/results.component';
import { NotificationsHistoryFilterRecipientComponent } from './filters/recipient/recipient.component';
import { NotificationsHistoryFilterRangeDateComponent } from './filters/rangeDate/rangedate.component';
import { SharedService } from '../../services/shared.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        PanelModule,
        ToastModule,
        MessageModule,
        MessagesModule,
        ButtonModule,
        TableModule,
        DialogModule,
        PasswordModule,
        InputTextModule,
        CheckboxModule,
        ConfirmDialogModule,
        DynamicDialogModule,
        DropdownModule,
        ChipsModule,
        CalendarModule
    ],    
    providers: [
        MessageService,
        DialogService,
        ConfirmationService,
        NotificationsHistoryService,
        SharedService
    ],
    declarations: [
        NotificationsHistoryFilterTypeComponent,
        NotificationsHistoryResultsComponent,
        NotificationsHistoryFilterRecipientComponent,
        NotificationsHistoryFilterRangeDateComponent
    ],
    exports: [
        NotificationsHistoryFilterTypeComponent,
        NotificationsHistoryResultsComponent,
        NotificationsHistoryFilterRecipientComponent,
        NotificationsHistoryFilterRangeDateComponent
    ],
})

export class NotificationsHistoryModule {}