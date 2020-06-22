import { HomeComponent } from './shared/components/home/home.component';
import { NotFoundRouteComponent } from './shared/components/common/notfound/notfound.component';
import { MODULES_ROUTE } from './modules/modules-routing.module';
import { UnauthorizedRouteComponent } from './shared/components/common/unauthorized/unauthorized.component';
import { UtilsGuard } from './shared/utils/utils.guard';
import { PruebaComponent } from './shared/components/prueba/prueba.component';

export const APP_ROUTES = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "hermex", redirectTo: "/hermex/home", pathMatch: "full" },
  { path: 'home', component: HomeComponent },
  { path: 'prueba', component: PruebaComponent },
  { path: 'external', children: MODULES_ROUTE, canActivate: [UtilsGuard], },
  { path: 'unauthorized', component: UnauthorizedRouteComponent },
  { path: '**', component: NotFoundRouteComponent }
]