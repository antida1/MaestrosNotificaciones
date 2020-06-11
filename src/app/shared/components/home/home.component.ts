import { Component } from '@angular/core';

@Component({
    selector: 'home-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent {

    public listFiltersNotificationsHistory: any[];
    public filterNotificationsHistorySelected: string;

    constructor() {
        this.listFiltersNotificationsHistory = [
            { label:'-- Seleccione --', value: null} ,
            { label: 'Por rango de fechas', value: 'RF' },
            { label: 'Por destinatario', value: 'US' },
            { label: 'Por tipo', value: 'TP' }
        ];
    }
}