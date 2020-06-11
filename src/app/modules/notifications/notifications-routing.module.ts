import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationsMessagesComponent } from './components/messages/messages.component';

const routes: Routes = [
  {
    path: ':nameapplication/:emailuser',
    component: NotificationsMessagesComponent
  },
  {
    path: ':nameapplication',
    component: NotificationsMessagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class NotificationsRoutingModule { }