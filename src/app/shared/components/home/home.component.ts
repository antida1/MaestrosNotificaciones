import { Component, OnInit } from '@angular/core';
import { NotificationsMessagesComponent } from '../../../modules/notifications/components/messages/messages.component';
import { NotificationsService } from '../../../modules/notifications/notifications.service';

@Component({
    selector: 'home-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit{

    public listFiltersNotificationsHistory: any[];
    public filterNotificationsHistorySelected: string;

    constructor(private notificationsService: NotificationsService) {
        this.listFiltersNotificationsHistory = [
            { label:'-- Seleccione --', value: null} ,
            { label: 'Por rango de fechas', value: 'RF' },
            { label: 'Por destinatario', value: 'US' },
            { label: 'Por tipo', value: 'TP' }
        ];
    }
    ngOnInit(): void {
        this.notificationsService.getAllMaster().subscribe(r => console.log(r));
    }
}