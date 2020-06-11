import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GlobalConstants } from '../../../../utils/utils.const';
import * as moment from 'moment';

@Component({
    selector: 'notificationshistory-filter-rangedate',
    templateUrl: './rangedate.component.html'
})

export class NotificationsHistoryFilterRangeDateComponent implements OnInit {

    public startDate: Date;
    public endDate: Date;
    public searchFilter: any;
    public showResults: boolean;
    public localeCalendar: any;

    constructor(private messageService: MessageService) 
    {
        this.searchFilter = { };
        this.showResults = false;
        this.localeCalendar = GlobalConstants.localeCalendar;
    }

    //#region Métodos publicos
    public ngOnInit() {

    }

    /**
     * 
     */
    public get enableButtonSearch(): boolean {
        return (
            (typeof this.startDate !== "undefined" && this.startDate !== null) &&
            (typeof this.endDate !== "undefined" && this.endDate !== null) &&
            (this.endDate >= this.startDate)
        );
    }

    /**
     * 
     */
    public search(): void {
        this.showResults = false;
        this.searchFilter = { 
            key: "rangeDate",
            parameters: [
                { key: 'starDate', value: moment(this.startDate).format('YYYY-MM-DD') },
                { key: 'endDate', value: moment(this.endDate).format('YYYY-MM-DD') }
            ]
        };
        setTimeout(()=> this.showResults = true, 500);
    }

    /**
     * 
     */
    public onChangeEndDate(): void {
        if (typeof this.startDate == "undefined" || this.startDate === null) {
            this.endDate = null;
            this.messageService.add({
                severity:'warn', 
                summary: 'Advertencia', 
                detail:'Debe seleccionar la fecha desde.'
            });
        }
        else if (this.endDate < this.startDate) {
            this.endDate = null;
            this.messageService.add({
                severity:'error', 
                summary: 'Error', 
                detail:'La fecha hasta debe ser mayor o igual a la fecha desde.'
            });
        }
    }
    //#endregion Métodos publicos
}