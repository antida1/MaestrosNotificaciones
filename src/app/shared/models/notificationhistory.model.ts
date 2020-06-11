import * as moment from 'moment';

export class NotificationHistory {

    public id?: number;
    public typeNotification?: string;
    public subject?: string;
    public message?: string;
    public recipient?: string;
    public createdDate?: any;
    public createdDateWithFormat?: string;
    public correlationId?: string;
    public enableRetry?: boolean;
    public totalRetry?: number;
    public isSent?: boolean;
    public sent?: string;

    constructor(model?: NotificationHistory) {
        this.id = model.id;
        this.typeNotification = model.typeNotification;
        this.subject = model.subject;
        this.message = model.message;
        this.recipient = model.recipient;
        this.createdDate = model.createdDate;
        this.createdDateWithFormat = moment(model.createdDate).format('DD/MM/YYYY h:mm:ss a');
        this.correlationId = model.correlationId;
        this.enableRetry = model.enableRetry;
        this.totalRetry = model.totalRetry;
        this.isSent = model.isSent;
        this.sent = (this.isSent) ? 'Sí': 'No';
    }
}