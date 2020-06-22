import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';


// PrimeNg
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';

//Extras
import { NgxPaginationModule } from 'ngx-pagination';
import { TypeListServiceService } from './typeListService.service';
import { FilterPipe } from './pipes/filter.pipe';
import { NameValidationDirective } from './validations/name-validation.directive';


@NgModule({
  imports: [
    CommonModule,
    MessagesModule,
    ConfirmDialogModule,
    ToastModule,
    PaginatorModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    PanelModule,
    DropdownModule,
    NgxPaginationModule
  ],
  declarations: [
    HomeComponent,
    FilterPipe,
    NameValidationDirective
  ],
  providers: [
    TypeListServiceService
  ]

})
export class HomeModule { }
