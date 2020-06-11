import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'notificationshistory-filter-type',
    templateUrl: './type.component.html'
})

export class NotificationsHistoryFilterTypeComponent implements OnInit {

    public listNotificationType: any[];
    public notificationTypeSelected: string;
    public searchFilter: any;
    public showResults: boolean;

    constructor() 
    {
        this.listNotificationType = [
            { label:'-- Seleccione --', value: null} ,
            { label: 'Notificación interna', value: 'Interna' },
            { label: 'Notificación por correo electrónico', value: 'Email' },
            { label: 'Notificación interna y por correo electrónico', value: 'Todo' }
        ];
        this.searchFilter = { };
        this.showResults = false;
    }

    //#region Métodos publicos
    public ngOnInit() {

    }

    public onChangeNotificationType(): void {
        this.showResults = false;
        this.searchFilter = { 
            key: "type",
            parameters: [
                { key: 'type', value: this.notificationTypeSelected }
            ]
        };
        setTimeout(()=> this.showResults = true, 500);
    }
    //#endregion Métodos publicos
}