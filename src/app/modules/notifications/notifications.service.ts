import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { GenericResults } from '../../shared/models/genericresults.model';
import { URL_BASE_API_HISTORIAL_NOTIFICACIONES_W } from '../../../constants';
import { MasterList, MasterTypeList } from '../../shared/models/master.model';

@Injectable()
export class NotificationsService {    

    apiUrl = "http://172.19.5.218:9301/api/TypesList";
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

    public getAllMaster(): Observable<MasterTypeList[]>{
        return this.http.get<MasterTypeList[]>(this.apiUrl);
    }

    public createMaster(master:MasterTypeList):Observable<any>{
        return this.http.post<any>(this.apiUrl,master);
    }

    public deleteTypeList(id:string):Observable<any>{

        return this.http.delete<any>(this.apiUrl + "/"+ id);
    }
}