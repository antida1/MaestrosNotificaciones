import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MasterTypeList } from '../../models/master.model';
import { Observable } from 'rxjs';
import {URL_BASE_API_MASTER_TYPELIST_W} from '../../../../constants';


@Injectable()
export class TypeListServiceService {
    
    constructor(private http: HttpClient) { }

    public getAllMaster(): Observable<MasterTypeList[]>{
        return this.http.get<MasterTypeList[]>(URL_BASE_API_MASTER_TYPELIST_W);
    }

    public createMaster(master:MasterTypeList):Observable<any>{
        return this.http.post<any>(URL_BASE_API_MASTER_TYPELIST_W,master);
    }

    public deleteTypeList(id:string):Observable<any>{

        return this.http.delete<any>(URL_BASE_API_MASTER_TYPELIST_W + id);
    }

    public updateTypeList(master:MasterTypeList):Observable<any>{

        return this.http.put<any>(URL_BASE_API_MASTER_TYPELIST_W,master);
    }
    

}
