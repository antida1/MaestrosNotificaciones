import { Component, OnInit, Input } from '@angular/core';
import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';

import * as _ from 'lodash';

import { SharedService } from '../../../services/shared.service';
import { NotificationHistory } from '../../../models/notificationhistory.model';
import { NotificationsHistoryService } from '../notificationshistory.service';
import { GenericResults } from '../../../models/genericresults.model';

@Component({
    selector: 'notificationshistory-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss']
})

export class NotificationsHistoryResultsComponent implements OnInit {

    @Input() public searchFilter: any;
    public columns: any[];
    public loading: boolean;
    public totalResults: number;
    public listResults: NotificationHistory[];
    
    constructor(
        private notificationsHistoryService: NotificationsHistoryService,
        private sharedService: SharedService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {
        this.columns = [
            { field: 'id', header: 'ID', width: '' },
            { field: 'typeNotification', header: 'Tipo de notificación', width: '' },
            { field: 'subject', header: 'Asunto', width: '' },
            { field: 'message', header: 'Mensaje', width: '' },
            { field: 'recipient', header: 'Destinatario', width: '' },
            { field: 'createdDateWithFormat', header: 'Fecha de notificación', width: '' },   
            { field: 'totalRetry', header: 'Total reintentos', width: '' },
            { field: 'sent', header: '¿Mensaje enviado?', width: '' },
            { field: 'actions', header: 'Acciones', width: '' }       
        ];
        this.listResults = [];
    }

    //#region Métodos publicos
    public ngOnInit() { 
        
        if(this.searchFilter !== null && typeof this.searchFilter !== 'undefined') {  
            this.loading = true;                  
        }  
        else {
            this.loading = false;
        }  
    }

    /**
     * 
     * @param event 
     */
    public loadResults (event: LazyLoadEvent): void {  
        if(this.searchFilter !== null && typeof this.searchFilter !== 'undefined') {  
            this.loading = true;
            let page = ((event.first + event.rows) / event.rows);
            let limit = event.rows;
            this.notificationsHistoryService.getDataWithPagination(this.searchFilter.key, this.searchFilter.parameters, page, limit).subscribe(
                (genericResults: GenericResults) => {
                    this.loading = false;
                    this.totalResults = genericResults.rowCount;

                    this.listResults = [];
                    if(genericResults.results.length > 0) {
                        genericResults.results.forEach((element: NotificationHistory) => {
                            this.listResults = [...this.listResults, new NotificationHistory(element)];
                        });
                    } 
                }
            );
        }
    }

    /**
     * 
     * @param idNotificationHistory 
     */
    public notificationForwarding(idNotificationHistory: number, typeNotification: string) {
        if(typeNotification == 'Email') {
            this.confirmationService.confirm({
                message: '¿Esta seguro(a) de reenviar la notificación?',
                accept: () => {
                    this.sharedService.notificationForwarding(idNotificationHistory).subscribe(
                        (result: boolean) => {
                            if(result) {
                                this.messageService.add({
                                    key: "toast",
                                    severity:'success', 
                                    summary:'Completado', 
                                    detail:'La notificación se reenvio correctamente.'
                                });
    
                                let index: number = _.findIndex(this.listResults, (item: NotificationHistory) => item.id == idNotificationHistory);
                                let notification: NotificationHistory = _.find(this.listResults, (item: NotificationHistory) => item.id == idNotificationHistory);
                                notification.isSent = true;
                                this.listResults[index] = new NotificationHistory(notification);                            
                            }
                            else {
                                this.messageService.add({
                                    key: "toast",
                                    severity:'error', 
                                    summary:'Error', 
                                    detail:'La notificación no se reenvio correctamente. Vuelva a intentarlo.'
                                });
                            }
                        },
                        (error) => {
                            this.messageService.add({
                                key: "toast",
                                severity:'error', 
                                summary:'Error', 
                                detail: error.error
                            });
                        }
                    );
                }
            });
        }
        else {
            this.messageService.add({
                key: "toast",
                severity:'warn', 
                summary:'Advertencia', 
                detail: 'El reenvio de correo solo aplica para los tipos de notificación Email.'
            });
        }
        
        return false;
    }
    //#endregion Métodos publicos
}