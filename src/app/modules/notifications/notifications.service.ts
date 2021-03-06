import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { GenericResults } from '../../shared/models/genericresults.model';
import { URL_BASE_API_HISTORIAL_NOTIFICACIONES_W } from '../../../constants';

@Injectable()
export class NotificationsService {    
    constructor(private http: HttpClient) { }

    /**
     * 
     * @param recipient 
     * @param type 
     * @param page 
     * @param limit 
     */
    public getByRecipient(recipient: string, type: string, nameApplication: string, page: number, limit: number): Observable<GenericResults> {
        return this.http.get<GenericResults>(URL_BASE_API_HISTORIAL_NOTIFICACIONES_W + `/ByRecipient/${recipient}/${type}/${nameApplication}/${page}/${limit}`);
    }
}