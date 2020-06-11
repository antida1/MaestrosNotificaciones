import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LazyLoadEvent } from 'primeng/api';
import { Subscription } from 'rxjs';

import { URL_BASE_API_NOTIFICACIONES_W } from '../../../../../constants';
import { GenericResults } from '../../../../shared/models/genericresults.model';
import { NotificationHistory } from '../../../../shared/models/notificationhistory.model';
import { NotificationsService } from '../../notifications.service';
import { HubConnectionBuilder } from '@aspnet/signalr';

@Component({
    selector: 'notifications-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})

export class NotificationsMessagesComponent implements OnInit {  

    public totalResults: number;
    public listResults: NotificationHistory[];
    public listNotificationType: any[];
    public notificationTypeSelected: string;
    public showMessage: boolean;
    public messageSelected: NotificationHistory;
    public showResults: boolean;

    private emailUser: string;
    private routeQueryParams: Subscription;
    private nameApplication: string;
    
    constructor(
        private activatedRoute: ActivatedRoute,
        private notificationsService: NotificationsService
    ) { 
        this.routeQueryParams = this.activatedRoute.params.subscribe(params => {            
            if(params["emailuser"] !== null && typeof params["nameapplication"] !== "undefined") {
                this.emailUser = params["emailuser"];
                this.nameApplication = params["nameapplication"];
            }

            this.init();
        });        
    }

    public ngOnInit() {
        let connection = new HubConnectionBuilder()
            .withUrl(`${URL_BASE_API_NOTIFICACIONES_W}?user=${this.emailUser}_${this.nameApplication}`)
            .build();

        connection.on("ReceiveMessage", data => {
            this.totalResults++;
            let results = this.listResults;
            results = [...results, new NotificationHistory({
                id: data.id,
                subject: data.subject,
                message: data.message,
                createdDate: data.date 
            })];

            results.sort((a, b) => {
                return new Date(b.createdDate) > new Date(a.createdDate) ? 1 : -1; 
            });

            this.listResults = [];
            this.listResults = results;
            results = [];
        });

        const startSignalRConnection = connection => connection.start()
            .then(() => console.info('Websocket Connection Established'))
            .catch((err: any) => console.error('SignalR Connection Error: ', err));
        
        startSignalRConnection(connection)

        connection.onclose(
            (err) => {
                startSignalRConnection(connection);
            });
    }

    /**
     * 
     * @param event 
     */
    public loadResults (event: LazyLoadEvent): void {          
        let page = ((event.first + event.rows) / event.rows);
        let limit = event.rows;
        this.notificationsService.getByRecipient(this.emailUser, this.notificationTypeSelected, this.nameApplication, page, limit).subscribe(
            (genericResults: GenericResults) => {
                this.listResults = [];
                this.totalResults = genericResults.rowCount;
                if(genericResults.results.length > 0) {
                    genericResults.results.forEach((element: NotificationHistory) => {
                        this.listResults = [...this.listResults, new NotificationHistory(element)];
                    });
                } 
            }
        );
    }

    /**
     * 
     * @param item 
     */
    public onClickShowMessage(item: NotificationHistory): void {
        this.showMessage = true;
        this.messageSelected = item;
        this.deleteClassActive();
        this.addClassActive(item.id);
    }

    public onClickCloseMessage() : void {
        this.showMessage = false;
        this.messageSelected = null;
        this.deleteClassActive();
    }

    public onChangeNotificationType(event: any) : void {
        if(event.value !== null) {
            this.notificationTypeSelected = event.value;        
        }
        else {
            this.notificationTypeSelected = "Todo";
        }

        this.showMessage = false;
        this.showResults = false;
        this.messageSelected = null;
        this.deleteClassActive();
        setTimeout(()=> this.showResults = true, 500);
    }

    private deleteClassActive(): void {
        let currentActive = document.getElementsByClassName("message-selected-active");

        if(currentActive.length > 0) {
            currentActive[0].className = currentActive[0].className.replace(" message-selected-active", "");
        }        
    }

    private addClassActive(idElement: number): void {
        let currentItem = document.getElementById(idElement.toString());
        currentItem.className += " message-selected-active";
    }

    private init(): void {
        this.showMessage = false;
        this.showResults = true;
        this.notificationTypeSelected = "Todo";
        this.listNotificationType = [
            { label: 'Notificación interna', value: 'Interna' },
            { label: 'Notificación por correo electrónico', value: 'Email' },
            { label: 'Notificación interna y por correo electrónico', value: 'Todo' }
        ];
    }
}