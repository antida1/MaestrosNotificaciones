import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { URL_BASE_API_HISTORIAL_NOTIFICACIONES_W } from '../../../../constants';
import { NotificationHistory } from '../../models/notificationhistory.model';
import { GenericResults } from '../../models/genericresults.model';

import * as _ from 'lodash';

@Injectable()
export class NotificationsHistoryService {
    
    constructor(private http: HttpClient) {   
        
    }

    //#region Historial de notificaciones    
    /**
     * 
     * @param idElement 
     * @param idTypeList 
     */
    public getByIdElementTypeList(idElement: number, idTypeList: number): Observable<NotificationHistory[]> {
        return this.http.get<NotificationHistory[]>(URL_BASE_API_HISTORIAL_NOTIFICACIONES_W + `/ByIdElementTypeList/${idElement}/${idTypeList}`);
    }

    /**
     * 
     * @param starDate 
     * @param endDate 
     */
    public getByRangeDate(starDate: any, endDate: any, page: number, limit: number): Observable<GenericResults> {
        return this.http.get<GenericResults>(URL_BASE_API_HISTORIAL_NOTIFICACIONES_W + `/ByRangeDate/${starDate}/${endDate}/${page}/${limit}`);
    }

    /**
     * 
     * @param recipient 
     */
    public getByRecipient(recipient: string, page: number, limit: number): Observable<GenericResults> {
        return this.http.get<GenericResults>(URL_BASE_API_HISTORIAL_NOTIFICACIONES_W + `/ByRecipient/${recipient}/${page}/${limit}`);
    }

    /**
     * 
     * @param type 
     */
    public getByType(type: string, page: number, limit: number): Observable<GenericResults> {
        return this.http.get<GenericResults>(URL_BASE_API_HISTORIAL_NOTIFICACIONES_W + `/ByType/${type}/${page}/${limit}`);
    }

    /**
     * 
     * @param key 
     * @param parameters 
     * @param page 
     * @param limit 
     */
    public getDataWithPagination(key: string, parameters: any[], page: number, limit: number): Observable<GenericResults> {
        let result: Observable<GenericResults>;

        switch(key) {
            case "type": {
                let filter = _.filter(parameters, (item: any) => item.key == "type")[0]["value"];
                result = this.getByType(filter, page, limit);
                break;
            }
            case "recipient": {
                let filter = _.filter(parameters, (item: any) => item.key == "recipient")[0]["value"];
                result = this.getByRecipient(filter, page, limit);
                break;
            }
            case "rangeDate": {
                let starDate: any = _.filter(parameters, (item: any) => item.key == "starDate")[0]["value"];
                let endDate: any = _.filter(parameters, (item: any) => item.key == "endDate")[0]["value"];
                result = this.getByRangeDate(starDate, endDate, page, limit);
                break;
            }
            default: {
                result = null;
            }
        }

        return result;
    }
    //#endregion Historial de notificaciones    
}