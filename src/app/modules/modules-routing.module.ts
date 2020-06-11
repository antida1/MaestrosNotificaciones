import { UtilsGuard } from '../shared/utils/utils.guard';

const notificationsModule = () => import('./notifications/notifications.module').then(mod => mod.NotificationsModule);

export const MODULES_ROUTE = [
    { 
        path: 'notifications',
        canActivate: [UtilsGuard],
        children: [
            { 
              path: 'messages', 
              loadChildren: notificationsModule
            }
        ]
    }
];