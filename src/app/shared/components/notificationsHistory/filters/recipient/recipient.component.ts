import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'notificationshistory-filter-recipient',
    templateUrl: './recipient.component.html'
})

export class NotificationsHistoryFilterRecipientComponent implements OnInit {

    public recipient: string;
    public searchFilter: any;
    public showResults: boolean;

    constructor() 
    {
        this.searchFilter = { };
        this.showResults = false;
    }

    //#region Métodos publicos
    public ngOnInit() {

    }

    /**
     * 
     */
    public get enableButtonSearch(): boolean {
        return (
            (typeof this.recipient !== "undefined" && this.recipient !== null && this.recipient !== "")
        );
    }

    /**
     * 
     */
    public search(): void {
        this.showResults = false;
        this.searchFilter = { 
            key: "recipient",
            parameters: [
                { key: 'recipient', value: this.recipient }
            ]
        };
        setTimeout(()=> this.showResults = true, 500);
    }
    //#endregion Métodos publicos
}