import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';
import { GlobalConstants } from "./utils.const";

@Injectable()
export class UtilsGuard implements CanActivate {
    constructor (private router: Router) { }

    public canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let helper = new JwtHelperService();
        if(GlobalConstants.token() !== null) {
            let token: string = GlobalConstants.token().replace("Bearer ", "").replace("bearer ", "");
            if(typeof token !== "undefined" && token !== "" && token !== null) {           
                if(helper.isTokenExpired(token)) {
                    this.router.navigate(['hermex/unauthorized']);
                    return false;
                }
                else {
                    return true;
                }
            }
            else {
                this.router.navigate(['hermex/unauthorized']);
                return false;
            }
        }
        else {
            this.router.navigate(['hermex/unauthorized']);
            return false;
        }
    }
}