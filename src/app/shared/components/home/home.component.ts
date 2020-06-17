import { Component, OnInit } from '@angular/core';
import { NotificationsMessagesComponent } from '../../../modules/notifications/components/messages/messages.component';
import { NotificationsService } from '../../../modules/notifications/notifications.service';
import { MasterTypeList } from '../../models/master.model';
import { MessageService } from 'primeng/api';
import {ConfirmationService} from 'primeng/api';




@Component({
    selector: 'home-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {


    public masterTypeListSelected: MasterTypeList = {
        id: '',
        name: '',
        description: ''
    };
    pageActual: number = 1;
    public filterTypeList = '';
    public masterTypeList: MasterTypeList[] = [];
    public listFiltersNotificationsHistory: any[];
    public filterNotificationsHistorySelected: string;



    constructor(private notificationsService: NotificationsService,
        private messageService: MessageService,private confirmation:ConfirmationService) {
        this.listFiltersNotificationsHistory = [
            { label: '-- Seleccione --', value: null },
            { label: 'Por rango de fechas', value: 'RF' },
            { label: 'Por destinatario', value: 'US' },
            { label: 'Por tipo', value: 'TP' }
        ];
    }
    ngOnInit(): void {

        this.loadListType();
    }

    loadListType(): void {
        this.notificationsService.getAllMaster()
            .subscribe(result => { this.masterTypeList = result; console.log(this.masterTypeList) });
    }

    update(item: MasterTypeList) {
        this.masterTypeListSelected = item
    }

    createTypeList() {
        if (this.masterTypeListSelected.id == ""){
        this.notificationsService.createMaster(this.masterTypeListSelected)
            .subscribe(data => {
                this.messageService.add({ severity: 'success', summary: 'Bien hecho!!', detail: 'El tipo de lista ha sido creado' }),
                this.reset(),
                this.loadListType(),
                    error => {
                        this.messageService.add({ severity: 'error', summary: 'Uppss!!', detail: 'No se creo el tipo de lista' })
                    }
            });
        }else{
            this.notificationsService.updateTypeList(this.masterTypeListSelected)
            .subscribe(data => {
                this.messageService.add({ severity: 'success', summary: 'Bien hecho!!', detail: 'El tipo de lista ha sido actualizado' })
                this.loadListType(),
                    error => {
                        this.messageService.add({ severity: 'error', summary: 'Uppss!!', detail: 'No se actualizo el tipo de lista' })
                    }
            });
        }   
    }

    confirmDelete(id:string){

        this.confirmation.confirm({
            message:'¿ Seguro deseas eliminar este registro?',
            header:'Confirmar acción',
            accept:() => {
                this.notificationsService.deleteTypeList(id)
                .subscribe(result =>{console.log(result),this.loadListType()},
                error => console.error(error))
            }
        });
    }

    reset(){
        this.masterTypeListSelected ={id: '', name: '',description: ''};
    }

}