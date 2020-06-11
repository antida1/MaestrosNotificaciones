//import { NotificationHistory } from "./notificationHistory.model";

export class GenericResults {
    public currentPage?: number;
    public pageCount?: number;
    public pageSize?: number;
    public rowCount?: number;
    public results?: any[];

    constructor (model?: GenericResults) {
        this.currentPage = model.currentPage;
        this.pageCount = model.pageCount;
        this.pageSize = model.pageSize;
        this.rowCount = model.rowCount;
        this.results = model.results;    
    }
}