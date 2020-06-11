import { HomeComponent } from './shared/components/home/home.component';
import { NotFoundRouteComponent } from './shared/components/common/notfound/notfound.component';
import { MODULES_ROUTE } from './modules/modules-routing.module';
import { UnauthorizedRouteComponent } from './shared/components/common/unauthorized/unauthorized.component';
import { UtilsGuard } from './shared/utils/utils.guard';

export const APP_ROUTES = [
  { 
      path: "", 
      redirectTo: "/hermex/home", 
      pathMatch: "full" 
  },
  { 
    path: "hermex", 
    redirectTo: "/hermex/home", 
    pathMatch: "full" 
  },
  {
    path: 'hermex/home',
    component: HomeComponent,
    canActivate: [UtilsGuard],
  },
  { 
    path: 'hermex/external', 
    children: MODULES_ROUTE,
    canActivate: [UtilsGuard],
  },
  { 
    path: 'hermex/unauthorized', 
    component: UnauthorizedRouteComponent 
  },
  { 
    path: '**', 
    component: NotFoundRouteComponent 
  }  
]