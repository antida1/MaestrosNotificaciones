import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsMessagesComponent } from './components/messages/messages.component';
import { NotificationsService } from './notifications.service';
import { NotificationsHistoryService } from '../../shared/components/notificationsHistory/notificationshistory.service';

@NgModule({
  imports: [
    NotificationsRoutingModule,
    CommonModule,
    FormsModule,
    TableModule,
    DropdownModule
  ],
  declarations: [ 
    NotificationsMessagesComponent
  ],
  exports: [
    NotificationsMessagesComponent
  ],
  entryComponents: [
    NotificationsMessagesComponent
  ],
  providers: [
    NotificationsService,
    NotificationsHistoryService
  ]
})

export class NotificationsModule { 
  constructor() {
    
  }
}