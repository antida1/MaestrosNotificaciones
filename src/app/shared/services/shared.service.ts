import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { URL_BASE_API_REENVIO_NOTIFICACIONES_W } from '../../../constants';

@Injectable()
export class SharedService {
    
    constructor(private http: HttpClient) {   
        
    }

    //#region Reenvio de notificaciones
    public notificationForwarding(idNotificationHistory: number) : Observable<boolean> {
        return this.http.put<boolean>(URL_BASE_API_REENVIO_NOTIFICACIONES_W, {
            idNotificationHistory: idNotificationHistory
        });
    } 
    //#endregion Reenvio de notificaciones
}