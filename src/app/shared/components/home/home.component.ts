import { Component, OnInit } from '@angular/core';
import { NotificationsMessagesComponent } from '../../../modules/notifications/components/messages/messages.component';
import { NotificationsService } from '../../../modules/notifications/notifications.service';
import { MasterTypeList } from '../../models/master.model';
import { MessageService } from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import { FormBuilder } from '@angular/forms';
import { TypeListServiceService } from './typeListService.service';




@Component({
    selector: 'home-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

    constructor(private typeListService: TypeListServiceService,
        private messageService: MessageService,
        private confirmation:ConfirmationService,
        private formBuilder:FormBuilder) {
    }

    
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


    ngOnInit(): void {

        this.loadTypeList();
    }

    loadTypeList(): void {
        this.typeListService.getAllMaster()
            .subscribe(result => { this.masterTypeList = result; console.log(this.masterTypeList) });
    }

    update(item: MasterTypeList) {
        this.masterTypeListSelected = item
    }

    createTypeList() {
        if (this.masterTypeListSelected.id == ""){
        this.typeListService.createMaster(this.masterTypeListSelected)
            .subscribe(data => {
                this.messageService.add({ severity: 'success', summary: 'Bien hecho!!', detail: 'El tipo de lista ha sido creado' }),
                this.reset(),
                this.loadTypeList(),
                    error => {
                        this.messageService.add({ severity: 'error', summary: 'Uppss!!', detail: 'No se creo el tipo de lista' })
                    }
            });
        }else{
            this.typeListService.updateTypeList(this.masterTypeListSelected)
            .subscribe(data => {
                this.messageService.add({ severity: 'success', summary: 'Bien hecho!!', detail: 'El tipo de lista ha sido actualizado' })
                this.reset(),
                this.loadTypeList(),
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
                this.typeListService.deleteTypeList(id)
                .subscribe(result =>{console.log(result),this.loadTypeList()},
                error => console.error(error))
            }
        });
    }

    reset(){
        this.masterTypeListSelected = {id: '', name: '',description: ''};
    }

}